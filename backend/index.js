import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { io, app, server } from "./lib/socket.js";
app.use(express.json());
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import dotenv from "dotenv";
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
dotenv.config();

import connectDB from "./config/db.js";
const port = process.env.PORT || 3000;
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

server.listen(4000, () => {
  console.log("server running at http://localhost:4000");
  connectDB();
});
