import { Router } from "express";
import { createWorkspaceController, getWorkspaceByIdController ,getMyWorkspacesController, updateWorkspaceController, deleteWorkspaceController} from "../controller/workspace.controller.js";;
import {verifyJWT} from "../../auth/middlewares/auth.middleware.js";

const router = Router();


router.post("/", verifyJWT, createWorkspaceController);
router.get(
    "/:workspaceId",
    verifyJWT,
    getWorkspaceByIdController
);

router.get(
    "/",
    verifyJWT,
    getMyWorkspacesController
);

router.patch(
  "/:workspaceId",
  verifyJWT,
  updateWorkspaceController
);
router.delete(
  "/:workspaceId",
  verifyJWT,
  deleteWorkspaceController
);
export default router;