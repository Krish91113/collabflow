import User from "../../auth/models/user.models.js";
import WorkspaceMember from "../../workspace/model/workspaceMember.model.js";
import ApiError from "../../../utils/ApiError.js";

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