import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import { createWorkspaceSchema } from "../validator/workspace.validator.js";
import { createWorkspace ,getWorkspaceById} from "../service/workspace.service.js";

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