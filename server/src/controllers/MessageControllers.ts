import { Request, Response } from "express";
import Conversation from "../models/ConversationModel";
import Message from "../models/MessageModel";
import User from "../models/UserModel";
import { getReceiverSocketId, io } from "../socket/socket";
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    if (!message || !receiverId)
      return res.status(401).json({ message: "Missing Entries" });

    const user = await User.findOne({ email: res.locals.jwtData?.email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const senderId = user?._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    });

    if (!conversation)
      conversation = await Conversation.create({
        participants: [receiverId, senderId],
      });

    const newMessage = new Message({
      message,
      receiverId,
      senderId,
    });

    if (conversation) conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId)
      io.to(receiverSocketId).emit("newMessage", newMessage);

    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getMessage = async (req: Request, res: Response) => {
  try {
    const { id: receiverId } = req.params;
    if (!receiverId)
      return res.status(401).json({ message: "Missing Entries" });

    const user = await User.findOne({ email: res.locals.jwtData?.email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const senderId = user?._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
};
