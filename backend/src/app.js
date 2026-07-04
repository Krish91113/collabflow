import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./modules/auth/routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import notFoundMiddleware from "./middleware/notFound.middleware.js";

const app = express();

// Security
app.use(helmet());

// Logging
app.use(morgan("dev"));

// Compression
app.use(compression());

// CORS
app.use(cors());

// Cookie Parser
app.use(cookieParser());

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/api/v1/auth", authRoutes)
// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CollabFlow Backend Running 🚀"
  });
});

// Routes
// app.use("/api/v1/auth", authRoutes);
// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });
// MUST BE LAST
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;