import WorkspaceMember from "../../workspace/model/workspaceMember.model.js";
import ApiError from "../../../utils/ApiError.js";

export const verifyWorkspaceMember = async (
  req,
  res,
  next
) => {
  try {
    const { workspaceId } = req.params;

    const userId = req.user._id;

    const membership =
      await WorkspaceMember.findOne({
        workspace: workspaceId,
        user: userId,
      });

    if (!membership) {
      return next(
        new ApiError(
          403,
          "You are not a member of this workspace"
        )
      );
    }

    // Save membership for future APIs
    req.workspaceMember = membership;

    next();

  } catch (error) {
    next(error);
  }
};