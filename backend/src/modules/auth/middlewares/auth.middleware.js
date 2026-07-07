import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import ApiError from "../../../utils/ApiError.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};