import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  FetchSidebaruser,
  getMessage,
  sendMessage,
} from "../controller/message.controller.js";

const router = express.Router();

router.get("/user", protectedRoute, FetchSidebaruser);

router.get("/:id", protectedRoute, getMessage);

router.post("/sendMessages/:id", protectedRoute, sendMessage);
export default router;
