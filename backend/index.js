import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRoute from "./routes/user_route.js";
import messageRoute from "./routes/message_route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/server.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Routes
app.use("/user", UserRoute);
app.use("/message", messageRoute);

// ✅ MongoDB connection
try {
  await mongoose.connect(uri);
  console.log("✅ Database connected successfully");
} catch (error) {
  console.error("❌ Database connection failed:", error);
}

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "./frontend/dist");

  app.use(express.static(distPath));

  // ✅ Handle all remaining routes with React
  app.use((req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
} else {
  // ✅ Development fallback route
  app.get("/", (req, res) => {
    res.send("Hello WORLD!");
  });
}

// ✅ Start server
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
