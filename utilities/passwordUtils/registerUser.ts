import hashpassword from "./hashpassword";

async function registerUser(
  email: string,
  first_name: string,
  last_name: string,
  password: string
): Promise<void> {
  const hashedPassword = await hashpassword(password);
  // helper function
}

export default registerUser;
