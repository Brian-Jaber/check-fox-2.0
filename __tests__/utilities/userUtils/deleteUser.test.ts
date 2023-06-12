import db from "../../../server/database/db";
import deleteUser from "../../../utilities/userUtils/deleteUser";

jest.mock("../../../server/database/db", () => ({
  query: jest.fn(),
}));

describe("deleteUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call db.query with the correct query and email and log the deletion", async () => {
    const email = "test.email@gmail.com";

    await deleteUser(email);

    expect(db.query).toHaveBeenCalledWith("DELETE FROM Users WHERE email = ?", [
      email,
    ]);
  });
});
