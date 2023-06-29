import bcrypt from "bcrypt";

class User {
  static hashPassword: (password: string) => Promise<string> = async (
    password: string
  ) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };
}

export default User;
