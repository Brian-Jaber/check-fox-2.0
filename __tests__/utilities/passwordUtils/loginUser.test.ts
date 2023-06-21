import {
  loginUser,
  LoginError,
} from "../../../utilities/passwordUtils/loginUser";
import bcrypt from "bcrypt";
import db from "../../../server/database/db";
import isEmail from "validator/lib/isEmail";

jest.mock("../../../server/database/db", () => ({
  query: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

jest.mock("validator/lib/isEmail", () => jest.fn());

describe("loginUser", () => {
  let email: string;
  let password: string;

  beforeEach(() => {
    email = "test@test.com";

    jest.clearAllMocks();
  });

  it("Should throw a LoginError when email field is empty.", async () => {
    const email = "";
    const password = "password";

    await expect(loginUser(email, password)).rejects.toThrow(
      new LoginError("Please enter email.")
    );
  });

  it("Should throw a LoginError if password field is empty.", async () => {
    const email = "test@test.com";
    const password = "";

    await expect(loginUser(email, password)).rejects.toThrow(
      new LoginError("Please enter password.")
    );
  });

  it("Should throw an errror if incorrectly formatted email.", async () => {
    const email = "test.@testcom";
    const password = "password";

    (isEmail as jest.Mock).mockReturnValue(false);

    await expect(loginUser(email, password)).rejects.toThrow(
      new LoginError("Invalid email format.")
    );
  });

  it("It should throw an error if a user does not have a hashed password", async () => {
    const email = "test.@test.com";
    const password = "password";

    (isEmail as jest.Mock).mockReturnValue(true);

    (db.query as jest.Mock).mockResolvedValue([
      [
        {
          email,
          hashed_password: null,
        },
      ],
    ]);

    await expect(loginUser(email, password)).rejects.toThrow(
      new LoginError("No hash found for user.")
    );
  });

  it("Should throw an error if the password entered is incorrect.", async () => {
    const email = "test@test.com";
    const password = "password";
  });

  test.todo("It should return true if the entered password is correct");
});
