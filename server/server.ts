import express, { Request, Response } from "express";
import cors from "cors";
//placing db import here but not used as of now, remove later
// CAN GET RID OF MYSQL BUT KEEPING FOR NOW IN CASE
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
