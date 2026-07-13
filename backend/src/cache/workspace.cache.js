import {
  setCache,
  getCache,
  deleteCache,
} from "./redisCache.js";

import { CACHE_KEYS } from "./cacheKeys.js";

const WORKSPACE_TTL = 60 * 10; // 10 Minutes

// ===========================================
// Single Workspace
// ===========================================

export const cacheWorkspace = async (workspace) => {
  const data = workspace.toObject
    ? workspace.toObject()
    : workspace;

  await setCache(
    CACHE_KEYS.WORKSPACE(data._id),
    data,
    WORKSPACE_TTL
  );
};

export const getCachedWorkspace = async (workspaceId) => {
  return await getCache(
    CACHE_KEYS.WORKSPACE(workspaceId)
  );
};

export const deleteCachedWorkspace = async (workspaceId) => {
  await deleteCache(
    CACHE_KEYS.WORKSPACE(workspaceId)
  );
};

// ===========================================
// User Workspaces
// ===========================================

export const cacheUserWorkspaces = async (
  userId,
  workspaces
) => {
  await setCache(
    CACHE_KEYS.USER_WORKSPACES(userId),
    workspaces,
    WORKSPACE_TTL
  );
};

export const getCachedUserWorkspaces = async (
  userId
) => {
  return await getCache(
    CACHE_KEYS.USER_WORKSPACES(userId)
  );
};

export const deleteUserWorkspaceCache = async (
  userId
) => {
  await deleteCache(
    CACHE_KEYS.USER_WORKSPACES(userId)
  );
};

// ===========================================
// Workspace Members
// ===========================================

export const cacheWorkspaceMembers = async (
  workspaceId,
  members
) => {
  await setCache(
    CACHE_KEYS.WORKSPACE_MEMBERS(workspaceId),
    members,
    WORKSPACE_TTL
  );
};

export const getCachedWorkspaceMembers = async (
  workspaceId
) => {
  return await getCache(
    CACHE_KEYS.WORKSPACE_MEMBERS(workspaceId)
  );
};

export const deleteWorkspaceMembersCache = async (
  workspaceId
) => {
  await deleteCache(
    CACHE_KEYS.WORKSPACE_MEMBERS(workspaceId)
  );
};

