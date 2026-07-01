import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./modules/auth/routes/auth.routes.js";

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

// Global Error Handler
// app.use(errorMiddleware);

export default app;