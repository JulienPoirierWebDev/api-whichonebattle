"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const db_1 = __importDefault(require("../helpers/db"));
const user_model_1 = __importDefault(require("../models/user.model"));
const testData_1 = require("./testData");
const battle_model_1 = __importDefault(require("../models/battle.model"));
const mongoose_1 = require("mongoose");
const testData_2 = require("./testData");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)(true);
    const newUser1 = new user_model_1.default(testData_1.user1);
    yield newUser1.save();
    testData_1.user1._id = newUser1._id;
    const newUser2 = new user_model_1.default(testData_1.user2);
    testData_1.user2._id = newUser2._id;
    yield newUser2.save();
    const newUser3 = new user_model_1.default(testData_1.user3);
    testData_1.user3._id = newUser3._id;
    yield newUser3.save();
    testData_2.battle1.user_id = testData_1.user1._id;
    testData_2.battle2.user_id = testData_1.user1._id;
    testData_2.newBattleForPostTest.user_id = testData_1.user1._id;
    const newBattle1 = new battle_model_1.default(testData_2.battle1);
    yield newBattle1.save();
    const newBattle2 = new battle_model_1.default(testData_2.battle2);
    yield newBattle2.save();
    testData_2.battle1._id = newBattle1._id;
    testData_2.battle2._id = newBattle2._id;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.deleteMany();
    yield battle_model_1.default.deleteMany();
    yield mongoose_1.connection.db.dropDatabase();
    yield mongoose_1.connection.close();
}));
const actualRequest = (0, supertest_1.default)(app_1.default);
xdescribe("vote tests suite", () => {
    it("should create a response when vote", () => __awaiter(void 0, void 0, void 0, function* () {
        //user2 login
        const user2LoginResponse = yield actualRequest
            .post("/api/auth/signin")
            .set("Content-Type", "application/json")
            .send({ email: testData_1.user2.email, password: testData_1.user2.password });
        const response = yield actualRequest
            .post(`/api/battles/${testData_2.battle1._id}/vote`)
            .set("Authorization", `Bearer ${user2LoginResponse.body.token}`)
            .set("Content-Type", "application/json")
            .send({ name: "Fraise" })
            .expect(200)
            .expect("Content-Type", /json/);
        // response should contain a response with _id, user_id, battle_id and name
        expect(response.body).toEqual(expect.objectContaining({
            newVote: expect.objectContaining({
                _id: expect.any(String),
                user_id: expect.any(String),
                battle_id: expect.any(String),
                name: expect.any(String),
            }),
        }));
    }));
    it("should send error when user try to vote to a battle he already voted", () => __awaiter(void 0, void 0, void 0, function* () {
        const user2LoginResponse = yield actualRequest
            .post("/api/auth/signin")
            .set("Content-Type", "application/json")
            .send({ email: testData_1.user2.email, password: testData_1.user2.password });
        const response = yield actualRequest
            .post(`/api/battles/${testData_2.battle1._id}/vote`)
            .set("Authorization", `Bearer ${user2LoginResponse.body.token}`)
            .set("Content-Type", "application/json")
            .send({ name: "Fraise" })
            .expect(400)
            .expect("Content-Type", /json/);
        expect(response.body).toEqual(expect.objectContaining({
            error: "You already voted for this battle",
        }));
    }));
    it("should return battle with proposition count when vote", () => __awaiter(void 0, void 0, void 0, function* () {
        const user2LoginResponse = yield actualRequest
            .post("/api/auth/signin")
            .set("Content-Type", "application/json")
            .send({ email: testData_1.user2.email, password: testData_1.user2.password });
        const response = yield actualRequest
            .post(`/api/battles/${testData_2.battle2._id}/vote`)
            .set("Authorization", `Bearer ${user2LoginResponse.body.token}`)
            .set("Content-Type", "application/json")
            .send({ name: "Chien" })
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response.body).toEqual(expect.objectContaining({
            battleResult: expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    count: expect.any(Number),
                }),
            ]),
        }));
    }));
    it("should return all battles he voted when a user go to /api/users/:id/voted_battles", () => __awaiter(void 0, void 0, void 0, function* () { }));
    it("should return all battles he don't voted when a user go to /api/users/:id/unvoted_battle", () => __awaiter(void 0, void 0, void 0, function* () { }));
    it("should send error whend user try to vote with a name that is not in the propositions", () => __awaiter(void 0, void 0, void 0, function* () {
        const user3LoginResponse = yield actualRequest
            .post("/api/auth/signin")
            .set("Content-Type", "application/json")
            .send({ email: testData_1.user3.email, password: testData_1.user3.password });
        const response = yield actualRequest
            .post(`/api/battles/${testData_2.battle2._id}/vote`)
            .set("Authorization", `Bearer ${user3LoginResponse.body.token}`)
            .set("Content-Type", "application/json")
            .send({ name: "Poisson" })
            .expect(400)
            .expect("Content-Type", /json/);
        expect(response.body).toEqual(expect.objectContaining({
            error: "The name you provided is not in the propositions",
        }));
    }));
});
