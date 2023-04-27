import { Request, Response } from "express";
import { registerUser, isSqlError } from "../../utilities/passwordUtils/index";

export async function register(req: Request, res: Response) {
  const { email, first_name, last_name, password } = req.body;
  try {
    await registerUser(email, first_name, last_name, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: unknown) {
    if (isSqlError(error) && error.code === "ER_DUP_ENTRY") {
      res
        .status(409)
        .json({ message: "Error register user. Email already exists.", error });
    } else {
      res.status(500).json({ message: "Error registering user.", error });
    }
  }
}
