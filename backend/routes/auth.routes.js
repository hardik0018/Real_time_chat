import express from "express";
const router = express.Router();
import {
  SignIn,
  SignUp,
  LogOut,
  updateProfile,
  check,
} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

router.post("/login", SignIn);

router.post("/register", SignUp);

router.get("/logout", LogOut);
router.put("/update", protectedRoute, updateProfile);

router.get("/check", protectedRoute, check);

export default router;
