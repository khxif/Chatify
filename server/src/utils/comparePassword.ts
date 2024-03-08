import { compare } from "bcrypt";

const comparePassword = async (password: string, hashedPassword: string) => {
  const isPasswordValid = await compare(password, hashedPassword);
  console.log(isPasswordValid);
  
  return isPasswordValid;
};

export default comparePassword;
