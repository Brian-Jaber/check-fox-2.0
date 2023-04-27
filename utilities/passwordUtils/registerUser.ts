import db from "../../server/database/db";
import hashPassword from "./hashpassword";
import { SqlError } from "../customTypes";

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
  } catch (error: unknown) {
    if (isSqlError(error)) {
      console.error("Error registering user: ", error);
      throw error;
    } else {
      const genericError: SqlError = {
        code: "UNKNOWN_ERROR",
        message: "An unknown error occurred while registering the user.",
        errno: -1,
        sqlState: "",
        sqlMessage: "",
      };
      throw genericError;
    }
  }
}

function isSqlError(error: unknown): error is SqlError {
  return (error as SqlError).code !== undefined;
}

export { registerUser, isSqlError };
