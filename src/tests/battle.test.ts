import request from "supertest";
import app from "../app";
import connect from "../helpers/db";
import User from "../models/user.model";
import { user1, user2 } from "./testData";
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

xdescribe("battle tests suite", () => {
  it("GET BATTLE -> should return multiple battles", async () => {
    const response = await actualRequest
      .get(`/api/battles/`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          question: expect.any(String),
        }),
      ])
    );

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          texte: expect.any(String),
          propositions: expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
            }),
          ]),
        }),
      ])
    );

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: expect.any(String),
        }),
      ])
    );
  });

  it("GET BATTLE -> should return one battle", async () => {
    const response = await actualRequest
      .get(`/api/battles/${battle1._id}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        question: expect.any(String),
      })
    );

    expect(response.body).toEqual(
      expect.objectContaining({
        texte: expect.any(String),
        propositions: expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
          }),
        ]),
      })
    );

    expect(response.body).toEqual(
      expect.objectContaining({
        user_id: expect.any(String),
      })
    );
  });

  it("POST BATTLE -> should create a battle", async () => {
    const response = await actualRequest
      .post(`/api/battles/`)
      .send(newBattleForPostTest)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        question: expect.any(String),
      })
    );

    expect(response.body).toEqual(
      expect.objectContaining({
        texte: expect.any(String),
        propositions: expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
          }),
        ]),
      })
    );

    expect(response.body).toEqual(
      expect.objectContaining({
        user_id: expect.any(String),
      })
    );
  });

  it("PUT BATTLE -> should update a battle", async () => {
    const response = await actualRequest
      .put(`/api/battles/${battle1._id}`)
      .send({ question: "Nouvelle question" })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        question: "Nouvelle question",
      })
    );

    expect(response.body).toEqual(
      expect.objectContaining({
        texte: expect.any(String),
        propositions: expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
          }),
        ]),
      })
    );

    expect(response.body).toEqual(
      expect.objectContaining({
        user_id: expect.any(String),
      })
    );
  });

  it("DELETE BATTLE -> should delete a battle", async () => {
    const response = await actualRequest
      .delete(`/api/battles/${battle1._id}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        question: expect.any(String),
      })
    );

    expect(response.body).toEqual(
      expect.objectContaining({
        texte: expect.any(String),
        propositions: expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
          }),
        ]),
      })
    );

    expect(response.body).toEqual(
      expect.objectContaining({
        user_id: expect.any(String),
      })
    );
  });
});
