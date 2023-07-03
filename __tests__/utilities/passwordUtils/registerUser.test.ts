import db from "../../../server/database/db";
import User from "../../../server/models/UserModel";
import { SqlError } from "../../../Types/customTypes";
// TODO: write tests for all cases of registerUser function
// Mock Dependencies
jest.mock("../../../server/database/db", () => ({
  query: jest.fn(),
}));

describe("registerUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should store hashed password, email, first name, and lastname", async () => {
    const email = "test.email@gmail.com";
    const first_name = "john";
    const last_name = "doe";
    const password = "password";
    const hashedPassword = "hashed_password";

    jest
      .spyOn(User, "hashPassword")
      .mockResolvedValue(Promise.resolve(hashedPassword));

    // const hashedPassword = await User.hashPassword(password);
    // (User.hashPassword as jest.Mock).mockResolvedValue(hashedPassword)

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
