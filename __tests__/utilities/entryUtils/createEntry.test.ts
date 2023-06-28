import db from "../../../server/database/db";

jest.mock("../../../server/database/db", () => ({
  query: jest.fn(),
}));
