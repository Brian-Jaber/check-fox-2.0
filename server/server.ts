import express, { Request, Response } from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

const db = mysql.createPool({
  host: "localhost",
  user: "BERRYS",
  password: process.env.MYSQL_PASSWORD,
  database: "check_fox",
});

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
