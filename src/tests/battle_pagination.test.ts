import request from "supertest";
import app from "../app";
import connect from "../helpers/db";
import User from "../models/user.model";
import { user1, user2 } from "./testData";
import Battle from "../models/battle.model";
import { connection } from "mongoose";
import {
  battle1,
  battle2,
  battle3,
  battle4,
  battle5,
  battle6,
  battle7,
  battle8,
  battle9,
  battle10,
  battle11,
  battle12,
  battle13,
  battle14,
  battle15,
  battle16,
  battle17,
  battle18,
  battle19,
  battle20,
} from "./testData";

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

  const newBattle1 = new Battle(battle1);

  await newBattle1.save();

  const newBattle2 = new Battle(battle2);

  await newBattle2.save();

  battle1._id = newBattle1._id as string;
  battle2._id = newBattle2._id as string;

  battle3.user_id = user1._id;
  battle4.user_id = user1._id;
  battle5.user_id = user1._id;
  battle6.user_id = user1._id;
  battle7.user_id = user1._id;
  battle8.user_id = user1._id;
  battle9.user_id = user1._id;
  battle10.user_id = user1._id;
  battle11.user_id = user1._id;
  battle12.user_id = user1._id;
  battle13.user_id = user1._id;
  battle14.user_id = user1._id;
  battle15.user_id = user1._id;
  battle16.user_id = user1._id;
  battle17.user_id = user1._id;
  battle18.user_id = user1._id;
  battle19.user_id = user1._id;
  battle20.user_id = user1._id;

  const newBattle3 = new Battle(battle3);

  await newBattle3.save();

  battle3._id = newBattle3._id as string;

  const newBattle4 = new Battle(battle4);

  await newBattle4.save();

  battle4._id = newBattle4._id as string;

  // do the same for the other battles

  const newBattle5 = new Battle(battle5);

  await newBattle5.save();

  battle5._id = newBattle5._id as string;

  const newBattle6 = new Battle(battle6);
  await newBattle6.save();
  battle6._id = newBattle6._id as string;

  const newBattle7 = new Battle(battle7);
  await newBattle7.save();
  battle7._id = newBattle7._id as string;

  const newBattle8 = new Battle(battle8);
  await newBattle8.save();
  battle8._id = newBattle8._id as string;

  const newBattle9 = new Battle(battle9);
  await newBattle9.save();
  battle9._id = newBattle9._id as string;

  const newBattle10 = new Battle(battle10);
  await newBattle10.save();
  battle10._id = newBattle10._id as string;

  const newBattle11 = new Battle(battle11);
  await newBattle11.save();
  battle11._id = newBattle11._id as string;

  const newBattle12 = new Battle(battle12);
  await newBattle12.save();
  battle12._id = newBattle12._id as string;

  const newBattle13 = new Battle(battle13);
  await newBattle13.save();
  battle13._id = newBattle13._id as string;

  const newBattle14 = new Battle(battle14);
  await newBattle14.save();
  battle14._id = newBattle14._id as string;

  const newBattle15 = new Battle(battle15);
  await newBattle15.save();
  battle15._id = newBattle15._id as string;

  const newBattle16 = new Battle(battle16);
  await newBattle16.save();
  battle16._id = newBattle16._id as string;

  const newBattle17 = new Battle(battle17);
  await newBattle17.save();
  battle17._id = newBattle17._id as string;

  const newBattle18 = new Battle(battle18);
  await newBattle18.save();
  battle18._id = newBattle18._id as string;

  const newBattle19 = new Battle(battle19);
  await newBattle19.save();
  battle19._id = newBattle19._id as string;

  const newBattle20 = new Battle(battle20);
  await newBattle20.save();
  battle20._id = newBattle20._id as string;

  // user1 login

  const response = await request(app)
    .post("/api/auth/signin")
    .send({ email: user1.email, password: "123456" })
    .expect(200)
    .expect("Content-Type", /json/);

  const token = response.body.token;

  //make user1 vote for battle 1 3 5 9

  const response1 = await request(app)
    .post(`/api/battles/${battle1._id}/vote`)
    .set("Authorization", `Bearer ${token}`)
    .send({ name: battle1.propositions[0].name, user_id: user1._id })
    .expect(200)
    .expect("Content-Type", /json/);

  const response3 = await request(app)
    .post(`/api/battles/${battle3._id}/vote`)
    .set("Authorization", `Bearer ${token}`)
    .send({ name: battle3.propositions[0].name, user_id: user1._id })
    .expect(200)
    .expect("Content-Type", /json/);

  const response5 = await request(app)
    .post(`/api/battles/${battle5._id}/vote`)
    .set("Authorization", `Bearer ${token}`)
    .send({ name: battle5.propositions[1].name, user_id: user1._id })
    .expect(200)
    .expect("Content-Type", /json/);

  const response9 = await request(app)
    .post(`/api/battles/${battle9._id}/vote`)
    .set("Authorization", `Bearer ${token}`)
    .send({ name: battle9.propositions[1].name, user_id: user1._id })
    .expect(200)
    .expect("Content-Type", /json/);
});

afterAll(async () => {
  await Battle.deleteMany({});
  await User.deleteMany({});
  await connection.close();
});

const actualRequest = request(app);

xdescribe("get battles in order and pagination", () => {
  it("GET BATTLE -> should return 5 battles when query parameter limit is set to 5 and query parameter page is set to 0 or not set", async () => {
    const response = await actualRequest
      .get(`/api/battles/?limit=5`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toHaveLength(5);

    const response2 = await actualRequest
      .get(`/api/battles/?limit=5&page=0`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response2.body[0]).toMatchObject({
      _id: battle1._id?.toString(),
      question: battle1.question,
    });

    expect(response2.body[1]).toMatchObject({
      _id: battle2._id?.toString(),
      question: battle2.question,
    });

    expect(response2.body[2]).toMatchObject({
      _id: battle3._id?.toString(),
      question: battle3.question,
    });

    expect(response2.body[3]).toMatchObject({
      _id: battle4._id?.toString(),
      question: battle4.question,
    });

    expect(response2.body[4]).toMatchObject({
      _id: battle5._id?.toString(),
      question: battle5.question,
    });
  });

  it("GET BATTLE -> should return 5 battles when query parameter limit is set to 5 and query parameter page is set to 1", async () => {
    const response = await actualRequest
      .get(`/api/battles/?limit=5&page=1`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toHaveLength(5);

    expect(response.body[0]).toMatchObject({
      _id: battle6._id?.toString(),
      question: battle6.question,
    });

    expect(response.body[1]).toMatchObject({
      _id: battle7._id?.toString(),
      question: battle7.question,
    });

    expect(response.body[2]).toMatchObject({
      _id: battle8._id?.toString(),
      question: battle8.question,
    });

    expect(response.body[3]).toMatchObject({
      _id: battle9._id?.toString(),
      question: battle9.question,
    });

    expect(response.body[4]).toMatchObject({
      _id: battle10._id?.toString(),
      question: battle10.question,
    });
  });

  it("GET BATTLE -> should return 5 battles when query parameter limit is set to 5 and query parameter order is set to desc", async () => {
    const response = await actualRequest
      .get(`/api/battles/?limit=5&order=desc`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toHaveLength(5);

    expect(response.body[0]).toMatchObject({
      _id: battle20._id?.toString(),
      question: battle20.question,
    });

    expect(response.body[1]).toMatchObject({
      _id: battle19._id?.toString(),
      question: battle19.question,
    });

    expect(response.body[2]).toMatchObject({
      _id: battle18._id?.toString(),
      question: battle18.question,
    });

    expect(response.body[3]).toMatchObject({
      _id: battle17._id?.toString(),
      question: battle17.question,
    });

    expect(response.body[4]).toMatchObject({
      _id: battle16._id?.toString(),
      question: battle16.question,
    });
  });

  it("GET BATTLE -> should return 5 battles when query parameter limit is set to 5 and query parameter order is set to asc", async () => {
    const response = await actualRequest
      .get(`/api/battles/?limit=5&order=asc`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toHaveLength(5);

    expect(response.body[0]).toMatchObject({
      _id: battle1._id?.toString(),
      question: battle1.question,
    });

    expect(response.body[1]).toMatchObject({
      _id: battle2._id?.toString(),
      question: battle2.question,
    });

    expect(response.body[2]).toMatchObject({
      _id: battle3._id?.toString(),
      question: battle3.question,
    });

    expect(response.body[3]).toMatchObject({
      _id: battle4._id?.toString(),
      question: battle4.question,
    });

    expect(response.body[4]).toMatchObject({
      _id: battle5._id?.toString(),
      question: battle5.question,
    });
  });

  it("GET BATTLE -> should return 5 battles not voted by user when query parameter limit is set to 5 and query parameter voted is set to false", async () => {
    const loginResponse = await request(app)
      .post("/api/auth/signin")
      .send({
        email: user1.email,

        password: user1.password,
      })
      .expect(200);

    const user1Jwt = loginResponse.body.token;
    const response = await actualRequest
      .get(`/api/battles/?limit=5&unvoted=true`)
      .set("Authorization", `Bearer ${user1Jwt}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toHaveLength(5);

    expect(response.body[0]).toMatchObject({
      _id: battle2._id?.toString(),
      question: battle2.question,
    });

    expect(response.body[1]).toMatchObject({
      _id: battle4._id?.toString(),
      question: battle4.question,
    });

    expect(response.body[2]).toMatchObject({
      _id: battle6._id?.toString(),
      question: battle6.question,
    });

    expect(response.body[3]).toMatchObject({
      _id: battle7._id?.toString(),
      question: battle7.question,
    });

    expect(response.body[4]).toMatchObject({
      _id: battle8._id?.toString(),
      question: battle8.question,
    });
  });
});
