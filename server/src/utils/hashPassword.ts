import { genSalt, hash } from "bcrypt";

const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  return hashedPassword;
};

export default hashPassword;
