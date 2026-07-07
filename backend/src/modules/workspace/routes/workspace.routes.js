import { Router } from "express";
import { createWorkspaceController, getWorkspaceByIdController } from "../controller/workspace.controller.js";;
import {verifyJWT} from "../../auth/middlewares/auth.middleware.js";

const router = Router();


router.post("/", verifyJWT, createWorkspaceController);
router.get(
    "/:workspaceId",
    verifyJWT,
    getWorkspaceByIdController
);
export default router;