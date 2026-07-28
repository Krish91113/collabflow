import { Router } from "express";

import {
  createWorkspaceInvitationController,
} from "../controller/workspaceInvitation.controller.js";

import {
  verifyJWT,
} from "../../auth/middlewares/auth.middleware.js";

import {
  verifyWorkspaceMember,
} from "../../workspace-member/middleware/workspacePermission.middleware.js";

import {
  verifyWorkspaceRole,
} from "../../workspace-member/middleware/workspaceRole.middleware.js";

import {
  WORKSPACE_ROLE,
} from "../../workspace/constants/workspaceRoles.js";

const router = Router();

router.post(
  "/:workspaceId/invitations",

  verifyJWT,

  verifyWorkspaceMember,

  verifyWorkspaceRole([
    WORKSPACE_ROLE.OWNER,
    WORKSPACE_ROLE.ADMIN,
  ]),

  createWorkspaceInvitationController
);

export default router;