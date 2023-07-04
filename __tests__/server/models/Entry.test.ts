import db from "../../../server/database/db";

describe("Entry", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createEntry", () => {
    it.todo(
      "Should take in valid arguments for a new customer and create a new entry in database with passed in arguments"
    );
  });

  describe("editEntry", () => {
    it.todo("Should allow parameters of a ");
  });

  describe("deleteEntry", () => {
    it.todo("Should delete an entry and log it to the console.");
  });

  describe("readEntry", () => {
    it.todo(
      "Should fetch a specific entry from the database given a specific id."
    );
  });

  describe("queryEntries", () => {
    it.todo("Should fetch all entries from database when no parameters passed");
  });
});
