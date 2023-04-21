import db from "../../server/database/db";
import hashPassword from "./hashpassword";

async function registerUser(
  email: string,
  first_name: string,
  last_name: string,
  password: string
): Promise<void> {
  try {
    const hashedPassword = await hashPassword(password);
    await db.query(
      "INSERT INTO Users (email, first_name, last_name, hashed_password) VALUES (?,?,?,?)",
      [email, first_name, last_name, hashedPassword]
    );

    console.log("User registered successfully.");
  } catch (error) {
    console.error("Error registering user: ", error);
  }
}

export default registerUser;
