import db from "../../server/database/db";

async function deleteUser(email: string): Promise<void> {
  await db.query("DELETE FROM Users WHERE email = ?", [email]);
  console.log(`${email} has been deleted`);
}

export default deleteUser;
