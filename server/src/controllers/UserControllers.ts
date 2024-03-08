import { Request, Response } from "express";
import User from "../models/UserModel";

export const verifyUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: res.locals.jwtData?.email });
  if (!user) return res.status(401).json({ message: "User not found" });

  res.status(200).json({
    _id: user?._id,
    username: user?.username,
    email: user?.email,
  });
};

export const usersForSidebar = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: res.locals.jwtData?.email });
  if (!user) return res.status(401).json({ message: "User not found" });

  const users = await User.find({ _id: { $ne: user._id } }).select("-password");
  if (!users) return res.status(200).json([]);

  res.status(200).json(users);
};

export const searchUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  console.log(username);

  const users = await User.find({ username });
  console.log(users);

  if (!users) return res.status(200).json([]);

  res.status(200).json(users);
};
