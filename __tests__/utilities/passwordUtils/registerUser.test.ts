import {
  registerUser,
  isSqlError,
} from "../../../utilities/passwordUtils/registerUser";
import db from "../../../server/database/db";
import hashPassword from "../../../utilities/passwordUtils/hashPassword";
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
  // TODO Finish writing afterEach once deleteUser testing and function are done
});
