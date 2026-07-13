import User from "../models/user.models.js";
import ApiError from "../../../utils/ApiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../utils/jwt.js";
import {
  cacheUser,
  getCachedUser,
  deleteCachedUser,
} from "../../../cache/user.cache.js";
import {
  cacheRefreshToken,
  getRefreshToken,
  deleteRefreshToken,
} from "../../../cache/token.cache.js";

/**
 * Generate Access & Refresh Tokens
 */
const generateTokens = async (user) => {

  const accessToken = generateAccessToken(user);

  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;

  await user.save({
    validateBeforeSave: false,
  });

  // Cache Refresh Token
  await cacheRefreshToken(
    user._id,
    refreshToken
  );

  return {
    accessToken,
    refreshToken,
  };

};

/**
 * Register User
 */
export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const { accessToken, refreshToken } = await generateTokens(user);

  const createdUser = await User.findById(user._id);

  await cacheUser(createdUser);
  return {
    user: createdUser,
    accessToken,
    refreshToken,
  };
};

/**
 * Login User
 */
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  user.lastLogin = new Date();

  const { accessToken, refreshToken } = await generateTokens(user);

  const loggedInUser = await User.findById(user._id);
  await cacheUser(loggedInUser);
  return {
    user: loggedInUser,
    accessToken,
    refreshToken,
  };
};

/**
 * Logout User
 */
export const logoutUser = async (userId) => {

  await User.findByIdAndUpdate(userId, {
    $unset: {
      refreshToken: 1,
    },
  });

  await deleteCachedUser(userId);

  await deleteRefreshToken(userId);

};

/**
 * Refresh Access Token
 */
export const refreshAccessToken = async (incomingRefreshToken) => {
  try {
    const decoded = verifyRefreshToken(incomingRefreshToken);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const storedToken =
      await getRefreshToken(user._id);

    if (!storedToken) {

      throw new ApiError(
        401,
        "Refresh Token Expired"
      );

    }

    if (storedToken !== incomingRefreshToken) {

      throw new ApiError(
        401,
        "Invalid Refresh Token"
      );

    }

    const accessToken = generateAccessToken(user);

    return {
      accessToken,
    };
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
};

/**
 * Get Current User
 */
export const getCurrentUser = async (userId) => {

  const cachedUser = await getCachedUser(userId);

  if (cachedUser) {

    console.log("🟢 USER CACHE HIT");

    return cachedUser;

  }

  console.log("🔴 USER CACHE MISS");

  const user = await User.findById(userId);

  if (!user) {

    throw new ApiError(
      404,
      "User not found"
    );

  }

  await cacheUser(user);

  return user;

};