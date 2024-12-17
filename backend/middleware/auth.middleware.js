import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res
        .status(401)
        .json({ success: 0, message: "unauthorised - token not found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res
        .status(401)
        .json({ success: 0, message: "unauthorised - token not valid" });
    const user = await User.findById(decoded._id);

    if (!user)
      return res
        .status(401)
        .json({ success: 0, message: "unauthorised - user" });

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: 0, message: error.message });
  }
};
