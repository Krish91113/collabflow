import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
} from "../services/auth.service.js";

const cookieOptions = {
  httpOnly: true,
  secure: false, // true in production (HTTPS)
  sameSite: "lax",
};

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  return res
    .status(201)
    .cookie("refreshToken", result.refreshToken, cookieOptions)
    .json(
      new ApiResponse(201, "User registered successfully", {
        user: result.user,
        accessToken: result.accessToken,
      })
    );
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  return res
    .status(200)
    .cookie("refreshToken", result.refreshToken, cookieOptions)
    .json(
      new ApiResponse(200, "Login successful", {
        user: result.user,
        accessToken: result.accessToken,
      })
    );
});

export const logout = asyncHandler(async (req, res) => {
  await logoutUser(req.user._id);
  return res
    .clearCookie("refreshToken")
    .status(200)
    .json(new ApiResponse(200, "Logged out successfully"));
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await refreshAccessToken(refreshToken);

  return res.status(200).json(
    new ApiResponse(200, "Token refreshed", {
      accessToken: result.accessToken,
    })
  );
});

export const me = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      "Current user",
      req.user
    )
  );
});