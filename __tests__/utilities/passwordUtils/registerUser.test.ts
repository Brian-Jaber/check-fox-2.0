import {
  registerUser,
  isSqlError,
} from "../../../utilities/passwordUtils/registerUser";
import * as db from "../../../server/database/db";
import hashPassword from "../../../utilities/passwordUtils/hashPassword";
// TODO: write tests for all cases of registerUser function
// Mock Dependencies
jest.mock("../../../server/database/db", () => ({
  query: jest.fn(),
}));

jest.mock("../../../utilities/passwordUtils/hashPassword", () => ({
  default: jest.fn(),
}));

describe("registerUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
});
