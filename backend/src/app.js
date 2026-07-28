import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import redis from "./config/redis.js";

import authRoutes from "./modules/auth/routes/auth.routes.js";
import workspaceRoutes from "./modules/workspace/routes/workspace.routes.js";
import workspaceMemberRoutes from "./modules/workspace-member/routes/workspaceMember.routes.js";
import workspaceInvitationRoutes
  from "./modules/workspace-invitation/routes/workspaceInvitation.routes.js";

import errorMiddleware from "./middleware/error.middleware.js";
import notFoundMiddleware from "./middleware/notFound.middleware.js";

const app = express();

/* ---------------- Security ---------------- */

app.use(helmet());

/* ---------------- Logger ---------------- */

app.use(morgan("dev"));

/* ---------------- Compression ---------------- */

app.use(compression());

/* ---------------- CORS ---------------- */

app.use(cors());

/* ---------------- Cookies ---------------- */

app.use(cookieParser());

/* ---------------- Body Parser ---------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- Routes ---------------- */

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/workspaces", workspaceRoutes);

/*
Workspace Member APIs

POST   /api/v1/workspaces/:workspaceId/members
GET    /api/v1/workspaces/:workspaceId/members
PATCH  /api/v1/workspaces/:workspaceId/members/:memberId
DELETE /api/v1/workspaces/:workspaceId/members/:memberId
*/

app.use("/api/v1/workspaces", workspaceMemberRoutes);

/* ---------------- Health ---------------- */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CollabFlow Backend Running 🚀",
  });
});

/* ---------------- Redis Test ---------------- */

app.get("/redis-test", async (req, res) => {
  await redis.set("name", "Krish");

  const value = await redis.get("name");

  res.json({
    success: true,
    value,
  });
});
app.use(
  "/api/v1/workspaces",
  workspaceInvitationRoutes
);

/* ---------------- Error ---------------- */

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;