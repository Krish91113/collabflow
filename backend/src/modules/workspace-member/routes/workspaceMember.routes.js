import { Router } from "express";

import { verifyJWT } from "../../auth/middlewares/auth.middleware.js";

import {
    verifyWorkspaceMember,
} from "../middleware/workspacePermission.middleware.js";

import {
    verifyWorkspaceRole,
} from "../middleware/workspaceRole.middleware.js";

import {
    inviteMemberController,getWorkspaceMembersController
} from "../controller/workspaceMember.controller.js";

const router = Router();

router.post(

    "/:workspaceId/members",

    verifyJWT,

    verifyWorkspaceMember,

    verifyWorkspaceRole([
        "OWNER",
        "ADMIN",
    ]),

    inviteMemberController

);

router.get(
  "/:workspaceId/members",
  verifyJWT,
  verifyWorkspaceMember,
  getWorkspaceMembersController
);

export default router;