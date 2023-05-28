import bcrypt from "bcrypt";
import hashPassword from "../hashPassword";

jest.mock("bcrypt", () => ({
  hash: jest.fn(() => Promise.resolve("hashed_password")),
}));

describe("hashPassword", () => {
  it("should return a hashed password", async () => {
    const password = "myPassword";
    const result = await hashPassword(password);

    expect(bcrypt.hash as jest.Mock).toHaveBeenCalledWith(password, 10);

    expect(typeof result).toBe("string");
    expect(result).toEqual("hashed_password");
  });
});
