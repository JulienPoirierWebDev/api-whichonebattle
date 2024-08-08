import { user1 } from "./testData";
import connect from "../helpers/db";
import User from "../models/user.model";

import request from "supertest";

import app from "../app";
import { connection } from "mongoose";

const actualRequest = request(app);

beforeAll(async () => {
  await connect(true);

  const newUser1 = new User(user1);
  await newUser1.save();

  user1._id = newUser1._id as string;
});

afterAll(async () => {
  await User.deleteMany();
  await connection.db.dropDatabase();
  await connection.close();
});

describe("auth tests suite", () => {
  it("SIGNIN -> should return token and user", async () => {
    const response = await actualRequest
      .post(`/api/auth/signin`)
      .set("Content-Type", "application/json")
      .send({ email: user1.email, password: user1.password })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
        }),
      })
    );

    // check if cookie is set
    expect(response.header["set-cookie"]).toBeDefined();

    // check if token is valid
    const token = response.body.token;
    const user = response.body.user;

    const response2 = await actualRequest
      .get(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response2.body).toEqual(
      expect.objectContaining({
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
  });
});
