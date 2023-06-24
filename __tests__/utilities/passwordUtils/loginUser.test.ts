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
    password = "password";

    jest.clearAllMocks();
  });

  it("Should throw a LoginError when email field is empty.", async () => {
    email = "";

    await expect(loginUser(email, password)).rejects.toThrow(
      new LoginError("Please enter email.")
    );
  });

  it("Should throw a LoginError if password field is empty.", async () => {
    const password = "";

    await expect(loginUser(email, password)).rejects.toThrow(
      new LoginError("Please enter password.")
    );
  });

  it("Should throw an errror if incorrectly formatted email.", async () => {
    (isEmail as jest.Mock).mockReturnValue(false);

    await expect(loginUser(email, password)).rejects.toThrow(
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

    await expect(loginUser(email, password)).rejects.toThrow(
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

    await expect(loginUser(email, password)).rejects.toThrow(
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

    const result = await loginUser(email, password);
    expect(result).toMatchObject(mockUser);
  });
});
