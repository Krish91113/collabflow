import express from "express";

import {
  register,
  login,
  logout,
  refreshToken,
  me,
} from "../controller/auth.controller.js";

import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", verifyJWT, logout);

router.post("/refresh-token", refreshToken);

router.get("/me", verifyJWT, me);

export default router;