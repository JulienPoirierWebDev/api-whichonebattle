import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./routes/user.router";
import batlleRouter from "./routes/battle.router";
import authRouter from "./routes/auth.router";
import voteRouter from "./routes/vote.router";
import connect from "./helpers/db";
import User from "./models/user.model";
import Battle from "./models/battle.model";
import {
  battle1,
  battle2,
  battle3,
  battle4,
  battle5,
  battle6,
} from "./tests/testData";
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
  // describe api routes and how to use them
  const documentation = {
    "/api/users": {
      description: "get all users",
      methods: {
        GET: "Get all users",
        POST: "Create a user",
      },
    },
    "/api/users/:id": {
      description: "read, update, delete a user",
      methods: {
        GET: "Get a user",
        PUT: "Update a user",
        DELETE: "Delete a user",
      },
    },
    "/api/battles": {
      description: "CRUD operations for battles",
      methods: {
        GET: "Get all battles",
        POST: "Create a battle",
      },
    },
    "/api/battles:id": {
      description: "CRUD operations for a battle",
      methods: {
        GET: "Get a battle",
        PUT: "Update a battle",
        DELETE: "Delete a battle",
      },
    },
    "/api/battles/:id/vote": {
      description: "Vote for a battle",
      methods: {
        PUT: "Vote for a battle",
      },
      body: {
        name: "Name of the proposition you want to vote for",
      },
    },
    "/api/auth/signin": {
      description: "Sign in a user",
      methods: {
        POST: "Sign in a user",
      },
    },
    "/api/auth/signout": {
      description: "Sign out a user",
      methods: {
        GET: "Sign out a user",
      },
    },
    "/api/battles/:id": {
      description: "CRUD operations for a battle",
      methods: {
        GET: "Get a battle",
        PUT: "Update a battle",
        DELETE: "Delete a battle",
      },
    },
  };

  res.json(documentation);
});
/*
app.get("/api/populate_db", (req, res) => {
  console.log(process.env.NODE_ENV);
  const populate = async () => {
    await connect(true);

    // test if user "julien@email.com" exist

    let userId;
    const userExist = async () => {
      const user = await User.findOne({ email: "julien@email.com" });

      if (user) {
        userId = user._id;
      }
      return user ? true : false;
    };

    if (!userExist) {
      const user = new User({
        name: "Julien POIRIER",
        email: "julien@email.com",
        password: "password",
      });

      await user.save();

      userId = user._id;
      console.log("User created");
    }

    // create several battles

    const battle = new Battle(battle1, { user_id: userId });
    await battle.save();

    const battleTwo = new Battle(battle2, { user_id: userId });
    await battleTwo.save();

    const battleThree = new Battle(battle3, { user_id: userId });
    await battleThree.save();

    const battleFour = new Battle(battle4, { user_id: userId });
    await battleFour.save();

    const battleFive = new Battle(battle5, { user_id: userId });
    await battleFive.save();

    const battleSix = new Battle(battle6, { user_id: userId });
    await battleSix.save();

    console.log("Database populated");
  };

  populate();

  // populate db
  res.send("Database populated");
});
*/

export default app;
