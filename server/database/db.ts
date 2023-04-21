import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "BERRYS",
  password: process.env.MYSQL_PASSWORD,
  database: "check_fox",
});

export default db;
