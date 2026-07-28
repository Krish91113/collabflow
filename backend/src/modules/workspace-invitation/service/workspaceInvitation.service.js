import Workspace
  from "../../workspace/model/workspace.model.js";

import WorkspaceMember
  from "../../workspace/model/workspaceMember.model.js";

import WorkspaceInvitation
  from "../models/workspaceInvitation.model.js";

import User
  from "../../auth/models/user.models.js";

import ApiError
  from "../../../utils/ApiError.js";

import {
  generateInvitationToken,
  hashInvitationToken,
} from "../../../utils/invitationToken.js";

import {
  sendWorkspaceInvitationEmail,
} from "../../../services/mail.service.js";

export const createWorkspaceInvitation = async ({
  workspaceId,
  invitedBy,
  email,
  role,
}) => {
  const normalizedEmail = email.toLowerCase().trim();

  // 1. Check workspace
  const workspace = await Workspace.findById(
    workspaceId
  );

  if (!workspace) {
    throw new ApiError(
      404,
      "Workspace not found"
    );
  }

  // 2. Check user
  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    throw new ApiError(
      404,
      "No registered user found with this email"
    );
  }

  // 3. Check existing member
  const existingMember =
    await WorkspaceMember.findOne({
      workspace: workspaceId,
      user: user._id,
    });

  if (existingMember) {
    throw new ApiError(
      409,
      "User is already a workspace member"
    );
  }

  // 4. Check existing pending invitation
  const existingInvitation =
    await WorkspaceInvitation.findOne({
      workspace: workspaceId,
      email: normalizedEmail,
      status: "PENDING",
      expiresAt: {
        $gt: new Date(),
      },
    });

  if (existingInvitation) {
    throw new ApiError(
      409,
      "Invitation already sent"
    );
  }

  // 5. Generate token
  const invitationToken =
    generateInvitationToken();

  const tokenHash =
    hashInvitationToken(
      invitationToken
    );

  // 6. Expire after 24 hours
  const expiresAt = new Date(
    Date.now() +
      24 * 60 * 60 * 1000
  );

  // 7. Create invitation
  const invitation =
    await WorkspaceInvitation.create({
      workspace: workspaceId,
      email: normalizedEmail,
      invitedBy,
      role,
      tokenHash,
      expiresAt,
    });

  // 8. Get inviter
  const inviter = await User.findById(
    invitedBy
  );

  // 9. Send email
  await sendWorkspaceInvitationEmail({
    email: normalizedEmail,
    inviterName: inviter.name,
    workspaceName: workspace.name,
    invitationToken,
  });

  return invitation;
};