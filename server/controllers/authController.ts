import { NextFunction, Request, Response } from "express";
import {
  registerUser,
  isSqlError,
  loginUser,
} from "../../utilities/passwordUtils/index";

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

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const loggedIn = await loginUser(email, password);
    if (loggedIn) {
      res.status(200).json({ message: "User logged in successfully" });
    } else {
      res.status(401).json({ message: "Unauthorized access." });
    }
  } catch (error: unknown) {
    res.status(500).json({ message: "Error logging in user.", error });
  }
}
