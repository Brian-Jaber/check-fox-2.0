import {
  loginUser,
  LoginError,
} from "../../../utilities/passwordUtils/loginUser";
import bcrypt from "bcrypt";
import db from "../../../server/database/db";

jest.mock("../../../server/database/db", () => {
  query: jest.fn();
});

jest.mock("bcrypt", () => {
  compare: jest.fn();
});

describe("loginUser", () => {
  beforeEach(() => {
    jest.clearAllMocks;
  });

  test.todo("It should throw a LoginError if no characters are entered");
  // Not sure if test on line 23 is really necessary to be honest, at this point I am starting to enjoy testing
  test.todo(
    "It should throw an error if a user does not have a hashed password"
  );

  test.todo("It should throw an error if the password entered is incorrect");

  test.todo("It should return true if the entered password is correct");
});
