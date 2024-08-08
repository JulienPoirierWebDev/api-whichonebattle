import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./routes/user.router";
import batlleRouter from "./routes/battle.router";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/battles", batlleRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

export default app;
