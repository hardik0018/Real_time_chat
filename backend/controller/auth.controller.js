import User from "../models/user.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../config/cloudinary.js";

export const SignIn = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone)
      return res
        .status(400)
        .json({ success: 0, message: "Please enter your number" });

    const user = await User.findOne({ phone });

    if (!user)
      return res.status(400).json({ success: 0, message: "User not found" });

    let token = await generateToken(user._id, res);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "strict",
    });

    res.status(200).json({ success: 1, token, user });
  } catch (error) {
    console.log("Error in Auth Controller to Singin", error.meesage);
    res.status(500).json({ success: 0, message: error.message });
  }
};

export const SignUp = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone)
      return res
        .status(400)
        .json({ success: 0, message: "Please enter your details" });
    const user = await User.find({ phone });

    if (user.length)
      return res
        .status(400)
        .json({ success: 0, message: "User already exist" });

    const newUser = new User({
      name,
      phone,
    });

    let token = generateToken(newUser._id, res);

    await newUser.save();

    res.status(200).json({ success: 1, message: "User created", token: token });
  } catch (error) {
    console.log("Error in Auth Controller to Singup", error.message);
    res.status(500).json({ success: 0, message: error.message });
  }
};

export const LogOut = (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(400)
        .json({ success: 0, message: "Please login first" });

    res.clearCookie("token");
    res.status(200).json({ success: 1, message: "Logged out" });
  } catch (error) {
    consoloe.log(error.message);
    res.status(500).json({ success: 0, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { picture } = req.body;
    const id = req.user._id;

    if (!picture)
      return res
        .status(400)
        .json({ success: 0, message: "Please upload your picture" });

    const result = await cloudinary.uploader.upload(picture);

    await User.findByIdAndUpdate(id, { picture: result.secure_url });

    res.status(200).json({ success: 1, message: "Profile updated" });
  } catch (error) {
    console.log("Error in Auth Controller to UpdateProfile", error.message);
    res.status(500).json({ success: 0, message: error.message });
  }
};

export const check = (req, res) => {
  try {
    res.status(200).json({ success: 1, message: req.user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: 0, message: error.message });
  }
};
