import { Request, Response } from "express";
import User from "../models/UserModel";
import hashPassword from "../utils/hashPassword";
import generateToken from "../utils/generateToken";
import comparePassword from "../utils/comparePassword";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email });
    console.log(user);

    if (user)
      return res.status(401).json({ message: "Email already registered" });

    const hashedPassword = await hashPassword(password);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    }).save();
    console.log(newUser);
    const token = generateToken(newUser?._id, newUser.username, newUser.email);

    res.cookie("user", token, {
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      _id: newUser._id,
      username: newUser?.username,
      email: newUser?.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: (error as Error)?.message || "Something went wrong!",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email not registered" });

    const isPasswordValid = await comparePassword(password, user?.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user?._id, user?.username, user?.email);

    res.cookie("user", token, {
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      _id: user?._id,
      username: user?.username,
      email: user?.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error)?.message || "Something went wrong!",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .clearCookie("user", {
        path: "/",
      })
      .json({ message: "Logout success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error)?.message || "Something went wrong!",
    });
  }
};
