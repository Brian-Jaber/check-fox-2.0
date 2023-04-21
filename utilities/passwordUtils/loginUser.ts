// loginUser.ts
import db from "../../server/database/db";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2/promise";

async function loginUser(email: string, password: string): Promise<boolean> {
  try {
    // Fetch user from the database by email
    const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);

    const userData = rows as RowDataPacket[];

    if (userData.length === 0) {
      console.log("User not found.");
      return false;
    }

    const user = userData[0];

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      console.log("User logged in successfully.");
      return true;
    } else {
      console.log("Incorrect password.");
      return false;
    }
  } catch (error) {
    console.error("Error logging in user: ", error);
    return false;
  }
}

export default loginUser;
