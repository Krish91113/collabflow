import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";

import { inviteMemberSchema } from "../validator/workspaceMember.validator.js";

import { inviteMember, getWorkspaceMembers } from "../service/workspaceMember.service.js";

export const inviteMemberController =
asyncHandler(async (req,res)=>{

    const data =
        inviteMemberSchema.parse(req.body);

    const member =
        await inviteMember({

            workspaceId:
                req.params.workspaceId,

            ...data,

        });

    return res.status(201).json(

        new ApiResponse(

            201,

            "Member invited successfully",

            member

        )

    );

});

export const getWorkspaceMembersController =
  asyncHandler(async (req, res) => {

    const members =
      await getWorkspaceMembers(
        req.params.workspaceId
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Workspace members fetched successfully",
        members
      )
    );
  });