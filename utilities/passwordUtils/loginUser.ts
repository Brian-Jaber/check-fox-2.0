// loginUser.ts
import db from "../../server/database/db";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2/promise";
import isEmail from "validator/lib/isEmail";
import { User } from "../../Types/userTypes";

class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LoginError";
  }
}

async function loginUser(
  email: string,
  password: string
): Promise<RowDataPacket> {
  // Fetch user from the database by emai
  if (email === "") {
    throw new LoginError("Please enter email.");
  }
  if (password === "") {
    throw new LoginError("Please enter password.");
  }
  if (!isEmail(email)) {
    throw new LoginError("Invalid email format.");
  }

  const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
  const userData = rows as RowDataPacket[];

  if (userData.length === 0) {
    throw new LoginError("No user found with this email.");
  }

  const user = userData[0];
  console.log(userData[0]);
  if (!user.hashed_password) {
    throw new LoginError("No hash found for user.");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.hashed_password
  );
  if (!isPasswordCorrect) {
    throw new LoginError("Incorrect password.");
  }

  return user;
}

export { LoginError, loginUser };
