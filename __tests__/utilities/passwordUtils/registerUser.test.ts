import { registerUser } from "../../../utilities/passwordUtils/registerUser";
import db from "../../../server/database/db";
import hashPassword from "../../../utilities/passwordUtils/hashPassword";
import { SqlError } from "../../../utilities/customTypes";
// TODO: write tests for all cases of registerUser function
// Mock Dependencies
jest.mock("../../../server/database/db", () => ({
  query: jest.fn(),
}));

jest.mock("../../../utilities/passwordUtils/hashPassword", () => jest.fn());

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

    (hashPassword as jest.Mock).mockReturnValue(hashedPassword);

    await registerUser(email, first_name, last_name, password);

    expect(hashPassword).toHaveBeenCalledWith(password);

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

    (hashPassword as jest.Mock).mockReturnValue(
      Promise.resolve(hashedPassword)
    );

    (db.query as jest.Mock).mockReturnValue(Promise.reject(sqlError));

    const consoleSpy = jest.spyOn(console, "error");

    try {
      await registerUser(email, first_name, last_name, password);
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

    (hashPassword as jest.Mock).mockReturnValue(
      Promise.resolve(hashedPassword)
    );

    (db.query as jest.Mock).mockImplementation(() => {
      throw new Error("not a SqlError");
    });

    try {
      await registerUser(email, first_name, last_name, password);
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
