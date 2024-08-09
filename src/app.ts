import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./routes/user.router";
import batlleRouter from "./routes/battle.router";
import authRouter from "./routes/auth.router";
import voteRouter from "./routes/vote.router";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/battles", batlleRouter);
app.use("/api/auth", authRouter);
app.use("/api/battles", voteRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

export default app;
