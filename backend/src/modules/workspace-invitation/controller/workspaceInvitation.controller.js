import asyncHandler from "../../../utils/asyncHandler.js";

import ApiResponse from "../../../utils/ApiResponse.js";

import {
  createWorkspaceInvitation,
} from "../service/workspaceInvitation.service.js";

export const createWorkspaceInvitationController =
  asyncHandler(async (req, res) => {
    const invitation =
      await createWorkspaceInvitation({
        workspaceId:
          req.params.workspaceId,

        invitedBy:
          req.user._id,

        email:
          req.body.email,

        role:
          req.body.role,
      });

    return res.status(201).json(
      new ApiResponse(
        201,
        "Workspace invitation sent successfully",
        invitation
      )
    );
  });