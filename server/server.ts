import express, { Request, Response } from "express";
import cors from "cors";
//placing db import here but not used as of now, remove later
// CAN GET RID OF MYSQL BUT KEEPING FOR NOW IN CASE
import db from "./database/db";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
