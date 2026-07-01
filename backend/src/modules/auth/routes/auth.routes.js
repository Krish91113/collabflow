import express from "express";

import {
  register,
  login,
  logout,
  refreshToken,
  me,
} from "../controller/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authMiddleware, logout);

router.post("/refresh-token", refreshToken);

router.get("/me", authMiddleware, me);

export default router;