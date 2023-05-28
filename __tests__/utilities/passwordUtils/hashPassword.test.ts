import bcrypt from "bcrypt";
import hashPassword from "../../../utilities/passwordUtils/hashPassword";

jest.mock("bcrypt", () => ({
  hash: jest.fn(() => Promise.resolve("hashedPassword")),
}));

describe("hashPassword", () => {
  it("should return a hashed password", async () => {
    const password = "myPassword";
    const result = await hashPassword(password);

    expect(bcrypt.hash as jest.Mock).toHaveBeenCalledWith(password, 10);

    expect(typeof result).toBe("string");
    expect(result).toEqual("hashedPassword");
  });
});
