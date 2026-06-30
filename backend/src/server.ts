import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import dns from "node:dns";

dns.setServers(["8.8.8.8","8.8.4.4"]);
dotenv.config();

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});