import { Router } from "express";

import { verifyJWT } from "../../auth/middlewares/auth.middleware.js";

import {
  verifyWorkspaceMember,
} from "../middleware/workspacePermission.middleware.js";

import {
  verifyWorkspaceRole,
} from "../middleware/workspaceRole.middleware.js";

import {
  inviteMemberController,
  getWorkspaceMembersController,
  updateMemberRoleController,
  removeMemberController,
  leaveWorkspaceController,
  transferOwnershipController
} from "../controller/workspaceMember.controller.js";

import { WORKSPACE_ROLE } from "../../workspace/constants/workspaceRoles.js";

const router = Router();

router.post(
  "/:workspaceId/members",
  verifyJWT,
  verifyWorkspaceMember,
  verifyWorkspaceRole([
    WORKSPACE_ROLE.OWNER,
    WORKSPACE_ROLE.ADMIN,
  ]),
  inviteMemberController
);

router.get(
  "/:workspaceId/members",
  verifyJWT,
  verifyWorkspaceMember,
  getWorkspaceMembersController
);

router.patch(
  "/:workspaceId/members/:memberId",
  verifyJWT,
  verifyWorkspaceMember,
  verifyWorkspaceRole([
    WORKSPACE_ROLE.OWNER,
    WORKSPACE_ROLE.ADMIN,
  ]),
  updateMemberRoleController
);

router.delete(
  "/:workspaceId/members/:memberId",
  verifyJWT,
  verifyWorkspaceMember,
  verifyWorkspaceRole([
    WORKSPACE_ROLE.OWNER,
    WORKSPACE_ROLE.ADMIN,
  ]),
  removeMemberController
);

router.delete(
  "/:workspaceId/leave",
  verifyJWT,
  leaveWorkspaceController
);

router.patch(
  "/:workspaceId/transfer-ownership",
  verifyJWT,
  verifyWorkspaceMember,
  verifyWorkspaceRole([
    WORKSPACE_ROLE.OWNER,
  ]),
  transferOwnershipController
);
export default router;