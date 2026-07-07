import mongoose from "mongoose";
import Workspace from "../model/workspace.model.js";
import WorkspaceMember from "../model/workspaceMember.model.js";
import { WORKSPACE_ROLE } from "../constants/workspaceRoles.js";
import ApiError from "../../../utils/ApiError.js";

export const createWorkspace = async ({
  name,
  description,
  visibility,
  ownerId,
}) => {
  // Start Transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Create Workspace
    const workspace = await Workspace.create(
      [
        {
          name,
          description,
          visibility,
          owner: ownerId,
        },
      ],
      { session }
    );

    // 2. Create Owner Membership
    await WorkspaceMember.create(
      [
        {
          workspace: workspace[0]._id,
          user: ownerId,
          role: WORKSPACE_ROLE.OWNER,
        },
      ],
      { session }
    );

    // 3. Commit Transaction
    await session.commitTransaction();
    session.endSession();

    return workspace[0];
  } catch (error) {
    // Rollback Everything
    await session.abortTransaction();
    session.endSession();

    throw new ApiError(500, error.message);
  }
};

export const getWorkspaceById = async (workspaceId) =>{
    const workspace = await Workspace.findById(workspaceId);
    if(!workspace){
        throw new ApiError(404, "Workspace not found");
    }
    return workspace;
};