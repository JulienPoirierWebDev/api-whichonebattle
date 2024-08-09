import request from "supertest";
import app from "../app";
import connect from "../helpers/db";
import User from "../models/user.model";
import { connection } from "mongoose";
import { user1, user2 } from "./testData";

beforeAll(async () => {
  await connect(true);

  const newUser1 = new User(user1);
  await newUser1.save();

  user1._id = newUser1._id as string;

  const newUser2 = new User(user2);

  await newUser2.save();
});

afterAll(async () => {
  await User.deleteMany();
  await connection.dropDatabase();
  await connection.close();
});

const actualRequest = request(app);
xdescribe("users tests suite", () => {
  it("GET USERS -> should return multiple users", () => {
    return actualRequest
      .get(`/api/users/`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              name: expect.any(String),
              email: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            }),
          ])
        );
      });
  });
  it("GET ONE USER with ID -> should return one user when auth", async () => {
    const authResponse = await actualRequest
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({ email: user1.email, password: user1.password })
      .expect(200)
      .expect("Content-Type", /json/);

    const id = authResponse.body.user._id;

    const token = authResponse.body.token;
    const response = await actualRequest
      .get(`/api/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          name: "Julien POIRIER",
          email: "test@email.com",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ])
    );
  });
  it("CREATE USER WITH BODY -> should return created user", () => {
    const newUser = {
      name: "Julien POIRIER",
      email: "test3@email.com",
      password: "123456",
    };
    return actualRequest
      .post("/api/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String),
            email: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          })
        );
      });
  });
  it("MODIFY USER WITH BODY -> should return modified user when auth", async () => {
    const authResponse = await actualRequest
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({ email: user1.email, password: user1.password })
      .expect(200)
      .expect("Content-Type", /json/);

    const token = authResponse.body.token;

    const id = authResponse.body.user._id;

    const newUser = {
      name: "Autre exemple",
    };

    actualRequest
      .put(`/api/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual({
          _id: expect.any(String),
          name: "Autre exemple",
          email: "test@email.com",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });
  });
  it("DELETE USER WITH ID -> should return deleted user when auth", async () => {
    const authResponse = await actualRequest
      .post("/api/auth/signin")
      .set("Content-Type", "application/json")
      .send({ email: user1.email, password: user1.password })
      .expect(200)
      .expect("Content-Type", /json/);

    const token = authResponse.body.token;
    const id = authResponse.body.user._id;

    actualRequest
      .delete(`/api/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual({
          _id: expect.any(String),
          name: "Autre exemple",
          email: "test@email.com",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });
  });
});
