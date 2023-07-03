import User from "../../../server/models/UserModel";
import db from "../../../server/database/db";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import { SqlError, LoginError } from "../../../Types/customTypes";

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
  hash: jest.fn(() => Promise.resolve("hashedPassword")),
}));

jest.mock("../../../server/database/db", () => ({
  query: jest.fn(),
}));

jest.mock("validator/lib/isEmail", () => jest.fn());

describe("User", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("hashPassword", () => {
    it("should return a hashed password", async () => {
      const password = "myPassword";
      const result = await User.hashPassword(password);

      expect(bcrypt.hash as jest.Mock).toHaveBeenCalledWith(password, 10);

      expect(typeof result).toBe("string");
      expect(result).toEqual("hashedPassword");
    });
  });

  describe("registerUser", () => {
    it("should store hashed password, email, first name, and lastname", async () => {
      const email = "test.email@gmail.com";
      const first_name = "john";
      const last_name = "doe";
      const password = "password";
      const hashedPassword = "hashed_password";

      jest
        .spyOn(User, "hashPassword")
        .mockResolvedValue(Promise.resolve(hashedPassword));

      await User.registerUser(email, first_name, last_name, password);

      expect(db.query).toHaveBeenCalledWith(
        "INSERT INTO Users (email, first_name, last_name, hashed_password) VALUES (?,?,?,?)",
        [email, first_name, last_name, hashedPassword]
      );
    });

    it("should log sqlErrors", async () => {
      const email = "test.email@gmail.com";
      const first_name = "john";
      const last_name = "doe";
      const password = "password";
      const hashedPassword = "hashed_password";
      const sqlError: SqlError = {
        code: "SQL_ERROR",
        message: "Error occurred in the SQL query.",
        errno: 1001,
        sqlState: "",
        sqlMessage: "Error",
      };

      (User.hashPassword as jest.Mock).mockReturnValue(
        Promise.resolve(hashedPassword)
      );

      (db.query as jest.Mock).mockReturnValue(Promise.reject(sqlError));

      const consoleSpy = jest.spyOn(console, "error");

      try {
        await User.registerUser(email, first_name, last_name, password);
      } catch (error) {
        expect(error).toBe(sqlError);
      }

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error registering user: ",
        sqlError
      );
    });

    it("Should log unknown errors", async () => {
      const email = "test.email@gmail.com";
      const first_name = "john";
      const last_name = "doe";
      const password = "password";
      const hashedPassword = "hashed_password";

      (User.hashPassword as jest.Mock).mockReturnValue(
        Promise.resolve(hashedPassword)
      );

      (db.query as jest.Mock).mockImplementation(() => {
        throw new Error("not a SqlError");
      });

      try {
        await User.registerUser(email, first_name, last_name, password);
      } catch (error) {
        expect(error).toEqual({
          code: "UNKNOWN_ERROR",
          message: "An unknown error occurred while registering the user.",
          errno: -1,
          sqlState: "",
          sqlMessage: "",
        });
      }
    });
  });

  describe("loginUser", () => {
    let email: string;
    let password: string;

    beforeEach(() => {
      email = "test@test.com";
      password = "password";
    });

    it("Should throw a LoginError when email field is empty.", async () => {
      email = "";

      await expect(User.loginUser(email, password)).rejects.toThrow(
        new LoginError("Please enter email.")
      );
    });

    it("Should throw a LoginError if password field is empty.", async () => {
      const password = "";

      await expect(User.loginUser(email, password)).rejects.toThrow(
        new LoginError("Please enter password.")
      );
    });

    it("Should throw an errror if incorrectly formatted email.", async () => {
      (isEmail as jest.Mock).mockReturnValue(false);

      await expect(User.loginUser(email, password)).rejects.toThrow(
        new LoginError("Invalid email format.")
      );
    });

    it("It should throw an error if a user does not have a hashed password", async () => {
      (isEmail as jest.Mock).mockReturnValue(true);

      (db.query as jest.Mock).mockResolvedValue([
        [
          {
            email,
            hashed_password: null,
          },
        ],
      ]);

      await expect(User.loginUser(email, password)).rejects.toThrow(
        new LoginError("No hash found for user.")
      );
    });

    it("Should throw an error if the password entered is incorrect.", async () => {
      (db.query as jest.Mock).mockResolvedValue([
        [
          {
            email,
            hashed_password: "hashed_password",
          },
        ],
      ]);

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(User.loginUser(email, password)).rejects.toThrow(
        new LoginError("Incorrect password.")
      );
    });

    it("Should return usern data f if the entered password is correct", async () => {
      const mockUser = {
        email,
        hashed_password: "hashed_password",
      };

      (db.query as jest.Mock).mockResolvedValue([[mockUser]]);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await User.loginUser(email, password);
      expect(result).toMatchObject(mockUser);
    });
  });

  describe("deleteUser", () => {
    it("should call db.query with the correct query and email and log the deletion", async () => {
      const email = "test.email@gmail.com";

      await User.deleteUser(email);

      expect(db.query).toHaveBeenCalledWith(
        "DELETE FROM Users WHERE email = ?",
        [email]
      );
    });
  });
});
