import User from "../../auth/models/user.models.js";
import WorkspaceMember from "../../workspace/model/workspaceMember.model.js";
import Workspace from "../../workspace/model/workspace.model.js";
import ApiError from "../../../utils/ApiError.js";
import mongoose from "mongoose";
import { WORKSPACE_ROLE } from "../../workspace/constants/workspaceRoles.js";
import {
    deleteWorkspaceMembersCache,
    deleteUserWorkspaceCache,
    getCachedWorkspaceMembers,cacheWorkspaceMembers
} from "../../../cache/workspace.cache.js";

export const inviteMember = async ({

    workspaceId,
    email,
    role,

}) => {

    // Find User

    const user =
        await User.findOne({
            email,
        });

    if (!user) {

        throw new ApiError(
            404,
            "User not found"
        );

    }

    // Already Member ?

    const existingMember =
        await WorkspaceMember.findOne({

            workspace: workspaceId,

            user: user._id,

        });

    if (existingMember) {

        throw new ApiError(
            409,
            "User already belongs to workspace"
        );

    }

    // Create Membership

    const member =
        await WorkspaceMember.create({

            workspace: workspaceId,

            user: user._id,

            role,

        });

    // Redis Cleanup

    await deleteWorkspaceMembersCache(
        workspaceId
    );

    await deleteUserWorkspaceCache(
        user._id
    );

    return member;

};

export const getWorkspaceMembers = async (
  workspaceId
) => {

  // Redis
  const cachedMembers =
    await getCachedWorkspaceMembers(workspaceId);

  if (cachedMembers) {

    console.log("🟢 WORKSPACE MEMBERS CACHE HIT");

    return cachedMembers;
  }

  console.log("🔴 WORKSPACE MEMBERS CACHE MISS");

  const members = await WorkspaceMember.find({
    workspace: workspaceId,
  }).populate(
    "user",
    "name email avatar status"
  );

  await cacheWorkspaceMembers(
    workspaceId,
    members
  );

  return members;
};

export const updateMemberRole = async ({
  workspaceId,
  memberId,
  currentUserId,
  role,
}) => {
  const member = await WorkspaceMember.findById(memberId);

  if (!member) {
    throw new ApiError(404, "Member not found");
  }

  if (
    member.workspace.toString() !==
    workspaceId.toString()
  ) {
    throw new ApiError(
      400,
      "Member does not belong to this workspace"
    );
  }

  if (member.role === WORKSPACE_ROLE.OWNER) {
    throw new ApiError(
      400,
      "Owner role cannot be changed"
    );
  }

  if (
    member.user.toString() ===
    currentUserId.toString()
  ) {
    throw new ApiError(
      400,
      "You cannot change your own role"
    );
  }

  member.role = role;

  await member.save();

  await deleteWorkspaceMembersCache(workspaceId);

  return await member.populate(
    "user",
    "name email avatar status"
  );
};

export const removeMember = async ({
  workspaceId,
  memberId,
  requesterId,
}) => {
  // 1. Find member to be removed
  const member = await WorkspaceMember.findOne({
    _id: memberId,
    workspace: workspaceId,
  });

  if (!member) {
    throw new ApiError(
      404,
      "Member not found"
    );
  }

  // 2. Owner cannot be removed
  if (member.role === WORKSPACE_ROLE.OWNER) {
    throw new ApiError(
      403,
      "Workspace owner cannot be removed"
    );
  }

  // 3. Remove member
  await WorkspaceMember.findByIdAndDelete(
    memberId
  );

  // 4. Invalidate workspace members cache
  await deleteWorkspaceMembersCache(
    workspaceId
  );

  // 5. Invalidate user's workspace list cache
  await deleteUserWorkspaceCache(
    member.user
  );

  return member;
};

export const leaveWorkspace = async ({
  workspaceId,
  userId,
}) => {
  // 1. Find user's membership
  const membership = await WorkspaceMember.findOne({
    workspace: workspaceId,
    user: userId,
  });

  // 2. Check membership
  if (!membership) {
    throw new ApiError(
      403,
      "You are not a member of this workspace"
    );
  }

  // 3. Owner cannot leave directly
  if (
    membership.role === WORKSPACE_ROLE.OWNER
  ) {
    throw new ApiError(
      403,
      "Workspace owner cannot leave directly. Transfer ownership first."
    );
  }

  // 4. Delete membership
  await WorkspaceMember.findByIdAndDelete(
    membership._id
  );

  // 5. Invalidate workspace members cache
  await deleteWorkspaceMembersCache(
    workspaceId
  );

  // 6. Invalidate user's workspace list cache
  await deleteUserWorkspaceCache(
    userId
  );

  return true;
};

export const transferOwnership = async ({
  workspaceId,
  currentOwnerId,
  newOwnerId,
}) => {
  // Prevent transferring ownership to yourself
  if (
    currentOwnerId.toString() ===
    newOwnerId.toString()
  ) {
    throw new ApiError(
      400,
      "You are already the workspace owner"
    );
  }

  const session =
    await mongoose.startSession();

  session.startTransaction();

  try {
    // 1. Find current owner
    const currentOwner =
      await WorkspaceMember.findOne({
        workspace: workspaceId,
        user: currentOwnerId,
        role: WORKSPACE_ROLE.OWNER,
      }).session(session);

    if (!currentOwner) {
      throw new ApiError(
        403,
        "You are not the workspace owner"
      );
    }

    // 2. Find new owner membership
    const newOwner =
      await WorkspaceMember.findOne({
        workspace: workspaceId,
        user: newOwnerId,
      }).session(session);

    if (!newOwner) {
      throw new ApiError(
        404,
        "New owner must already be a workspace member"
      );
    }

    // 3. Change current owner to MEMBER
    currentOwner.role =
      WORKSPACE_ROLE.MEMBER;

    await currentOwner.save({
      session,
    });

    // 4. Change new member to OWNER
    newOwner.role =
      WORKSPACE_ROLE.OWNER;

    await newOwner.save({
      session,
    });

    // 5. Update workspace owner field
    await Workspace.findByIdAndUpdate(
      workspaceId,
      {
        owner: newOwnerId,
      },
      {
        session,
        new: true,
      }
    );

    // 6. Commit transaction
    await session.commitTransaction();
    session.endSession();

    // 7. Clear caches
    await deleteWorkspaceMembersCache(
      workspaceId
    );

    await deleteUserWorkspaceCache(
      currentOwnerId
    );

    await deleteUserWorkspaceCache(
      newOwnerId
    );

    return {
      previousOwner: currentOwner,
      newOwner,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};