import bcrypt from "bcrypt";
import db from "../database/db";
import { RowDataPacket } from "mysql2/promise";
import isEmail from "validator/lib/isEmail";
import { isSqlError, SqlError, LoginError } from "../../Types/customTypes";

class User {
  public static hashPassword: (password: string) => Promise<string> = async (
    password: string
  ) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  static loginUser: (
    email: string,
    password: string
  ) => Promise<RowDataPacket> = async (email, password) => {
    if (email === "") {
      throw new LoginError("Please enter email.");
    }
    if (password === "") {
      throw new LoginError("Please enter password.");
    }
    if (!isEmail(email)) {
      throw new LoginError("Invalid email format.");
    }

    const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    const userData = rows as RowDataPacket[];

    if (userData.length === 0) {
      throw new LoginError("No user found with this email.");
    }

    const user = userData[0];
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
  };

  static registerUser: (
    email: string,
    first_name: string,
    last_name: string,
    password: string
  ) => Promise<void> = async (email, first_name, last_name, password) => {
    try {
      const hashedPassword = await User.hashPassword(password);
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
  };

  static deleteUser: (email: string) => Promise<void> = async (email) => {
    await db.query("DELETE FROM Users WHERE email = ?", [email]);
    console.log(`${email} has been deleted`);
  };
}

export default User;
