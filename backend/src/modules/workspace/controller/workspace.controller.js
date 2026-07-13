import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import { createWorkspaceSchema, updateWorkspaceSchema } from "../validator/workspace.validator.js";
import { createWorkspace ,getWorkspaceById, getMyWorkspaces, updateWorkspace,deleteWorkspace} from "../service/workspace.service.js";

export const createWorkspaceController = asyncHandler(async (req, res) => {
  // Validate Request Body
  const validatedData = createWorkspaceSchema.parse(req.body);

  // Call Service
  const workspace = await createWorkspace({
    ...validatedData,
    ownerId: req.user._id,
  });

  // Send Response
  return res.status(201).json(
    new ApiResponse(
      201,
      "Workspace created successfully",
      workspace
    )
  );
});

export const getWorkspaceByIdController = asyncHandler(async (req, res) => {

    const workspace = await getWorkspaceById(
        req.params.workspaceId
    );

    res.status(200).json(
        new ApiResponse(
            200,
            "Workspace fetched successfully",
            workspace
        )
    );
});

export const getMyWorkspacesController = asyncHandler(
    async (req, res) => {

        const workspaces = await getMyWorkspaces(
            req.user._id
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                "Workspaces fetched successfully",
                workspaces
            )
        );
    }
);

// Update Workspace Controller
export const updateWorkspaceController = asyncHandler(
  async (req, res) => {
    const validatedData =
      updateWorkspaceSchema.parse(req.body);

    const workspace = await updateWorkspace({
      workspaceId: req.params.workspaceId,
      userId: req.user._id,
      updateData: validatedData,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Workspace updated successfully",
        workspace
      )
    );
  }
);
export const deleteWorkspaceController =
asyncHandler(async (req, res) => {

    await deleteWorkspace({

        workspaceId:
            req.params.workspaceId,

        userId:
            req.user._id

    });

    return res.status(200).json(

        new ApiResponse(

            200,

            "Workspace deleted successfully"

        )

    );

});