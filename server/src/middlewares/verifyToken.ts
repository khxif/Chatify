import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token || token.trim() === "")
      return res
        .status(401)
        .json({ message: "Invalid token or token malfunctioned" });

    const data = verify(token, process.env.JWT_SECRET!);
    if (!data) return res.status(401).json({ message: "Invalid Token!" });
    res.locals.jwtData = data;

    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: (error as Error).message || "Something went wrong!" });
  }
};
