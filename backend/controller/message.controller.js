import User from "../models/user.js";
import Message from "../models/message.js";
import cloundinary from "../config/cloudinary.js";
import { io, getReceiverSocketId } from "../lib/socket.js";

export const FetchSidebaruser = async (req, res) => {
  try {
    const myId = req.user._id;
    const user = await User.find({ _id: { $ne: myId } });
    res.status(200).json({ success: 1, user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: 0, message: error.message });
  }
};
export const getMessage = async (req, res) => {
  try {
    const { id: userTochatid } = req.params;
    const myId = req.user._id;
    const data = await Message.find({
      $or: [
        { senderId: myId, receverId: userTochatid },
        { senderId: userTochatid, receverId: myId },
      ],
    });

    res.status(200).json({ success: 1, data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: 0, message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { messagetext, img } = req.body;

    const myId = req.user._id;
    const reciverId = req.params.id;

    let imgUrl;

    if (img) {
      const response = await cloundinary.uploader.upload(img);
      imgUrl = response.secure_url;
    }
    const newMessage = new Message({
      senderId: myId,
      receverId: reciverId,
      messagetext,
      picture: imgUrl,
      read: false,
    });

    await newMessage.save();
    const receiverSocketId = getReceiverSocketId(reciverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ success: 1, message: "Message sent", newMessage });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: 0, message: error.message });
  }
};
