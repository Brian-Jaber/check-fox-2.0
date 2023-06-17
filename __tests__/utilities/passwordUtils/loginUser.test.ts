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
  beforeEach(() => {
    jest.clearAllMocks;
  });

  it("Should throw a LoginError when password field is empty.", async () => {
    // set conditions for our test
    // TODO necessity of RowDataPacket.  userData[0], forgot what this means and need to dig into that a bit
    const email = "";
    const password = "password";

    await expect(loginUser(email, password)).rejects.toThrow(LoginError);
  });

  // it("Should throw a LoginError if email field is empty.", async () => {
  //   const email = "sdfsdf";
  //   const password = "password";

  //   await expect(loginUser(email, password)).rejects.toThrow(LoginError);
  // });

  // it("Should throw a LoginError if email and password fields are emptied.", async () => {
  //   const email = "";
  //   const password = "";

  //   await expect(loginUser(email, password)).rejects.toThrow(LoginError);
  // });

  it("Should throw an errror if incorrectly formatted email.", async () => {
    const email = "test.emailgmail";
    const password = "sdfsdfsdfsdfsdf";

    (isEmail as jest.Mock).mockReturnValue(false);

    await expect(loginUser(email, password)).rejects.toThrow(LoginError);
  });

  test.todo(
    "It should throw an error if a user does not have a hashed password"
  );

  test.todo("It should throw an error if the password entered is incorrect");

  test.todo("It should return true if the entered password is correct");
});
