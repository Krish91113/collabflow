export const CACHE_KEYS = {
  USER: (id) => `user:${id}`,

  REFRESH_TOKEN: (id) => `refresh_token:${id}`,

  WORKSPACE: (id) => `workspace:${id}`,

  USER_WORKSPACES: (id) => `user_workspaces:${id}`,

  WORKSPACE_MEMBERS: (id) => `workspace_members:${id}`,
};