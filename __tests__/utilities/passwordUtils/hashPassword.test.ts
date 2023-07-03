import bcrypt from "bcrypt";
import User from "../../../server/models/UserModel";

jest.mock("bcrypt", () => ({
  hash: jest.fn(() => Promise.resolve("hashedPassword")),
}));

describe("hashPassword", () => {
  it("should return a hashed password", async () => {
    const password = "myPassword";
    const result = await User.hashPassword(password);

    expect(bcrypt.hash as jest.Mock).toHaveBeenCalledWith(password, 10);

    expect(typeof result).toBe("string");
    expect(result).toEqual("hashedPassword");
  });
});
