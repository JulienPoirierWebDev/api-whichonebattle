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
describe("users tests suite", () => {
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
  it("GET ONE USER with ID -> should return one users", () => {
    return actualRequest
      .get(`/api/users/${user1._id}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
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
  it("MODIFY USER WITH BODY -> should return modified user", () => {
    const newUser = {
      name: "Autre exemple",
    };
    return actualRequest
      .put(`/api/users/${user1._id}`)
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
  it("DELETE USER WITH ID -> should return deleted user", () => {
    return actualRequest
      .delete(`/api/users/${user1._id}`)
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
