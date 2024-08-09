import request from "supertest";
import app from "../app";
import { before } from "node:test";
import connect from "../helpers/db";
import User from "../models/user.model";
import { user1, user2, user3 } from "./testData";
import Battle from "../models/battle.model";
import { connection } from "mongoose";
import { battle1, battle2, newBattleForPostTest } from "./testData";

beforeAll(async () => {
  await connect(true);

  const newUser1 = new User(user1);
  await newUser1.save();

  user1._id = newUser1._id as string;

  const newUser2 = new User(user2);

  user2._id = newUser2._id as string;

  await newUser2.save();

  const newUser3 = new User(user3);

  user3._id = newUser3._id as string;

  await newUser3.save();

  battle1.user_id = user1._id;
  battle2.user_id = user1._id;
  newBattleForPostTest.user_id = user1._id;

  const newBattle1 = new Battle(battle1);

  await newBattle1.save();

  const newBattle2 = new Battle(battle2);

  await newBattle2.save();

  battle1._id = newBattle1._id as string;

  battle2._id = newBattle2._id as string;
});

afterAll(async () => {
  await User.deleteMany();
  await Battle.deleteMany();
  await connection.db.dropDatabase();
  await connection.close();
});

const actualRequest = request(app);

xdescribe("vote tests suite", () => {
  it("should create a response when vote", async () => {
    //user2 login
    const user2LoginResponse = await actualRequest
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({ email: user2.email, password: user2.password });

    const response = await actualRequest
      .post(`/api/battles/${battle1._id}/vote`)
      .set("Authorization", `Bearer ${user2LoginResponse.body.token}`)
      .set("Content-Type", "application/json")
      .send({ name: "Fraise" })
      .expect(200)
      .expect("Content-Type", /json/);

    // response should contain a response with _id, user_id, battle_id and name
    expect(response.body).toEqual(
      expect.objectContaining({
        newVote: expect.objectContaining({
          _id: expect.any(String),
          user_id: expect.any(String),
          battle_id: expect.any(String),
          name: expect.any(String),
        }),
      })
    );
  });

  it("should send error when user try to vote to a battle he already voted", async () => {
    const user2LoginResponse = await actualRequest
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({ email: user2.email, password: user2.password });

    const response = await actualRequest
      .post(`/api/battles/${battle1._id}/vote`)
      .set("Authorization", `Bearer ${user2LoginResponse.body.token}`)
      .set("Content-Type", "application/json")
      .send({ name: "Fraise" })
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: "You already voted for this battle",
      })
    );
  });

  it("should return battle with proposition count when vote", async () => {
    const user2LoginResponse = await actualRequest
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({ email: user2.email, password: user2.password });

    const response = await actualRequest
      .post(`/api/battles/${battle2._id}/vote`)
      .set("Authorization", `Bearer ${user2LoginResponse.body.token}`)
      .set("Content-Type", "application/json")
      .send({ name: "Chien" })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        battleResult: expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            count: expect.any(Number),
          }),
        ]),
      })
    );
  });

  it("should return all battles he voted when a user go to /api/users/:id/voted_battles", async () => {});

  it("should return all battles he don't voted when a user go to /api/users/:id/unvoted_battle", async () => {});

  it("should send error whend user try to vote with a name that is not in the propositions", async () => {
    const user3LoginResponse = await actualRequest
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({ email: user3.email, password: user3.password });

    const response = await actualRequest
      .post(`/api/battles/${battle2._id}/vote`)
      .set("Authorization", `Bearer ${user3LoginResponse.body.token}`)
      .set("Content-Type", "application/json")
      .send({ name: "Poisson" })
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: "The name you provided is not in the propositions",
      })
    );
  });
});
