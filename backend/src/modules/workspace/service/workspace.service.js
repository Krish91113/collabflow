import mongoose from "mongoose";
import Workspace from "../model/workspace.model.js";
import WorkspaceMember from "../model/workspaceMember.model.js";
import { WORKSPACE_ROLE } from "../constants/workspaceRoles.js";
import ApiError from "../../../utils/ApiError.js";
import {
  cacheWorkspace,
  getCachedWorkspace,
  deleteCachedWorkspace,
  cacheUserWorkspaces,
  getCachedUserWorkspaces,
  deleteUserWorkspaceCache,
} from "../../../cache/workspace.cache.js";

/**
 * ------------------------------------------------------------------
 * Create Workspace
 * ------------------------------------------------------------------
 */
export const createWorkspace = async ({
  name,
  description,
  visibility,
  ownerId,
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Create Workspace
    const workspace = await Workspace.create(
      [
        {
          name,
          description,
          visibility,
          owner: ownerId,
        },
      ],
      { session }
    );

    // 2. Create Owner Membership
    await WorkspaceMember.create(
      [
        {
          workspace: workspace[0]._id,
          user: ownerId,
          role: WORKSPACE_ROLE.OWNER,
        },
      ],
      { session }
    );

    // 3. Commit Transaction
    await session.commitTransaction();
    session.endSession();

    // ===========================
    // REDIS CACHE
    // ===========================

    // Cache the newly created workspace
    await cacheWorkspace(workspace[0]);

    // User workspace list changed
    // Remove old list cache
    await deleteUserWorkspaceCache(ownerId);

    return workspace[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw new ApiError(500, error.message);
  }
};

/**
 * ------------------------------------------------------------------
 * Get Workspace By Id
 * ------------------------------------------------------------------
 */
export const getWorkspaceById = async (
  workspaceId
) => {

  // -----------------------------
  // STEP 1
  // Check Redis
  // -----------------------------

  const cachedWorkspace =
    await getCachedWorkspace(workspaceId);

  if (cachedWorkspace) {

    console.log(
      "🟢 WORKSPACE CACHE HIT"
    );

    return cachedWorkspace;

  }

  console.log(
    "🔴 WORKSPACE CACHE MISS"
  );

  // -----------------------------
  // STEP 2
  // MongoDB
  // -----------------------------

  const workspace =
    await Workspace.findById(workspaceId);

  if (!workspace) {

    throw new ApiError(
      404,
      "Workspace not found"
    );

  }

  // -----------------------------
  // STEP 3
  // Store Redis
  // -----------------------------

  await cacheWorkspace(workspace);

  return workspace;

};

/**
 * ------------------------------------------------------------------
 * Get My Workspaces
 * ------------------------------------------------------------------
 */
export const getMyWorkspaces = async (userId) => {

  // ======================================
  // STEP 1
  // Check Redis
  // ======================================

  const cachedWorkspaces =
    await getCachedUserWorkspaces(userId);

  if (cachedWorkspaces) {

    console.log(
      "🟢 USER WORKSPACES CACHE HIT"
    );

    return cachedWorkspaces;

  }

  console.log(
    "🔴 USER WORKSPACES CACHE MISS"
  );

  // ======================================
  // STEP 2
  // Get Memberships
  // ======================================

  const memberships =
    await WorkspaceMember.find({
      user: userId,
    });

  const workspaceIds =
    memberships.map(
      membership => membership.workspace
    );

  // ======================================
  // STEP 3
  // Fetch Workspaces
  // ======================================

  const workspaces =
    await Workspace.find({
      _id: {
        $in: workspaceIds,
      },
    });

  // ======================================
  // STEP 4
  // Cache Entire List
  // ======================================

  await cacheUserWorkspaces(
    userId,
    workspaces
  );

  return workspaces;

};

/**
 * ------------------------------------------------------------------
 * Update Workspace
 * ------------------------------------------------------------------
 */
export const updateWorkspace = async ({
  workspaceId,
  userId,
  updateData,
}) => {

  // -----------------------------
  // Find Workspace
  // -----------------------------

  const workspace =
    await Workspace.findById(workspaceId);

  if (!workspace) {

    throw new ApiError(
      404,
      "Workspace not found"
    );

  }

  // -----------------------------
  // Authorization
  // -----------------------------

  if (
    workspace.owner.toString() !==
    userId.toString()
  ) {

    throw new ApiError(
      403,
      "Only workspace owner can update workspace"
    );

  }

  // -----------------------------
  // Update Fields
  // -----------------------------

  Object.assign(
    workspace,
    updateData
  );

  await workspace.save();

  // -----------------------------
  // Update Redis
  // -----------------------------

  await cacheWorkspace(workspace);

  // -----------------------------
  // Delete Workspace List Cache
  // -----------------------------

  await deleteUserWorkspaceCache(
    workspace.owner
  );

  return workspace;

};

/**
 * ------------------------------------------------------------------
 * Delete Workspace
 * ------------------------------------------------------------------
 */
export const deleteWorkspace = async ({
  workspaceId,
  userId,
}) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {

    //--------------------------------
    // Find Workspace
    //--------------------------------

    const workspace =
      await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new ApiError(
        404,
        "Workspace not found"
      );
    }

    //--------------------------------
    // Authorization
    //--------------------------------

    if (
      workspace.owner.toString() !==
      userId.toString()
    ) {
      throw new ApiError(
        403,
        "Only owner can delete workspace"
      );
    }

    //--------------------------------
    // Delete Members
    //--------------------------------

    await WorkspaceMember.deleteMany(
      {
        workspace: workspaceId,
      },
      { session }
    );

    //--------------------------------
    // Delete Workspace
    //--------------------------------

    await Workspace.findByIdAndDelete(
      workspaceId,
      { session }
    );

    //--------------------------------
    // Commit Transaction
    //--------------------------------

    await session.commitTransaction();

    session.endSession();

    //--------------------------------
    // Redis Cleanup
    //--------------------------------

    await deleteCachedWorkspace(
      workspaceId
    );

    await deleteUserWorkspaceCache(
      workspace.owner
    );

    return true;

  } catch (error) {

    await session.abortTransaction();

    session.endSession();

    throw error;
  }
};