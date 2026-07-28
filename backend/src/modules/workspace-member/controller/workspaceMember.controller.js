import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";

import { inviteMemberSchema , updateMemberRoleSchema, transferOwnershipSchema} from "../validator/workspaceMember.validator.js";

import { inviteMember, getWorkspaceMembers , updateMemberRole, removeMember,leaveWorkspace, transferOwnership} from "../service/workspaceMember.service.js";

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
  export const updateMemberRoleController =
  asyncHandler(async (req, res) => {
    const validatedData =
      updateMemberRoleSchema.parse(req.body);

    const member =
      await updateMemberRole({
        workspaceId:
          req.params.workspaceId,

        memberId:
          req.params.memberId,

        currentUserId:
          req.user._id,

        role: validatedData.role,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Member role updated successfully",
        member
      )
    );
  });

  export const removeMemberController = asyncHandler(
  async (req, res) => {
    const removedMember = await removeMember({
      workspaceId: req.params.workspaceId,
      memberId: req.params.memberId,
      requesterId: req.user._id,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Member removed successfully",
        removedMember
      )
    );
  }
);

export const leaveWorkspaceController = asyncHandler(
  async (req, res) => {
    await leaveWorkspace({
      workspaceId: req.params.workspaceId,
      userId: req.user._id,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        "You left the workspace successfully"
      )
    );
  }
);

export const transferOwnershipController =
  asyncHandler(async (req, res) => {
    const validatedData =
      transferOwnershipSchema.parse(req.body);

    const updatedMemberships =
      await transferOwnership({
        workspaceId: req.params.workspaceId,
        currentOwnerId: req.user._id,
        newOwnerId: validatedData.newOwnerId,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Workspace ownership transferred successfully",
        updatedMemberships
      )
    );
  });