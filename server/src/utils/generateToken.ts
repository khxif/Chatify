import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (id: any, username: string, email: string) => {
  console.log(process.env.JWT_SECRET);

  const token = jwt.sign({ id, username, email }, process.env.JWT_SECRET!);
  console.log(token);
  return token;
};

export default generateToken;
