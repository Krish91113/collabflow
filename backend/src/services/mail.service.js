import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendWorkspaceInvitationEmail = async ({
  email,
  inviterName,
  workspaceName,
  invitationToken,
}) => {
  const invitationLink =
    `${process.env.FRONTEND_URL}/workspace/invitations/accept?token=${invitationToken}`;

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: `${inviterName} invited you to ${workspaceName}`,

    html: `
      <h2>You've been invited to join ${workspaceName}</h2>

      <p>
        ${inviterName} has invited you to join the workspace.
      </p>

      <a href="${invitationLink}">
        Accept Invitation
      </a>

      <p>
        This invitation expires in 24 hours.
      </p>
    `,
  });

  console.log("✅ Invitation email sent:", info.messageId);

  return info;
};