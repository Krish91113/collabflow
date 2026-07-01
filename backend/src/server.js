import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
// import connectDB from "./config/db.js";
import dns from "dns";
dns.setServers(["8.8.8.8","8.8.4.4"])
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();