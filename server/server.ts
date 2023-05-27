import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";

import { LoginError } from "../utilities/passwordUtils/loginUser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express server is up and running!");
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof LoginError) {
    res.status(401).json({ message: err.message });
  } else {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
