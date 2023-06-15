// loginUser.ts
import db from "../../server/database/db";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2/promise";

class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LoginError";
  }
}

async function loginUser(email: string, password: string): Promise<void> {
  // Fetch user from the database by email
  const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
  const userData = rows as RowDataPacket[];

  if (userData.length === 0) {
    throw new LoginError("No characters entered.");
  }

  const user = userData[0];

  if (!user.hashed_password) {
    throw new LoginError("No hash found for user.");
  }
  // Compare the provided password with the stored hashed password

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.hashed_password
  );
  if (!isPasswordCorrect) {
    throw new LoginError("Incorrect password.");
  }
}

export { LoginError, loginUser };
