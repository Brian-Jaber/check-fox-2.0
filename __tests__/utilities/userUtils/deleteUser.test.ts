import db from "../../../server/database/db";
import User from "../../../server/models/UserModel";

jest.mock("../../../server/database/db", () => ({
  query: jest.fn(),
}));

describe("deleteUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call db.query with the correct query and email and log the deletion", async () => {
    const email = "test.email@gmail.com";

    await User.deleteUser(email);

    expect(db.query).toHaveBeenCalledWith("DELETE FROM Users WHERE email = ?", [
      email,
    ]);
  });
});
