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
describe("battle tests suite", () => {
    it("GET BATTLE -> should return multiple battles", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield actualRequest
            .get(`/api/battles/`)
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                _id: expect.any(String),
                question: expect.any(String),
            }),
        ]));
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                texte: expect.any(String),
                propositions: expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                    }),
                ]),
            }),
        ]));
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                user_id: expect.any(String),
            }),
        ]));
    }));
    it("GET BATTLE -> should return one battle", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield actualRequest
            .get(`/api/battles/${testData_2.battle1._id}`)
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response.body).toEqual(expect.objectContaining({
            _id: expect.any(String),
            question: expect.any(String),
        }));
        expect(response.body).toEqual(expect.objectContaining({
            texte: expect.any(String),
            propositions: expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                }),
            ]),
        }));
        expect(response.body).toEqual(expect.objectContaining({
            user_id: expect.any(String),
        }));
    }));
    it("POST BATTLE -> should create a battle", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield actualRequest
            .post(`/api/battles/`)
            .send(testData_2.newBattleForPostTest)
            .expect(201)
            .expect("Content-Type", /json/);
        expect(response.body).toEqual(expect.objectContaining({
            _id: expect.any(String),
            question: expect.any(String),
        }));
        expect(response.body).toEqual(expect.objectContaining({
            texte: expect.any(String),
            propositions: expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                }),
            ]),
        }));
        expect(response.body).toEqual(expect.objectContaining({
            user_id: expect.any(String),
        }));
    }));
    it("PUT BATTLE -> should update a battle", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield actualRequest
            .put(`/api/battles/${testData_2.battle1._id}`)
            .send({ question: "Nouvelle question" })
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response.body).toEqual(expect.objectContaining({
            _id: expect.any(String),
            question: "Nouvelle question",
        }));
        expect(response.body).toEqual(expect.objectContaining({
            texte: expect.any(String),
            propositions: expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                }),
            ]),
        }));
        expect(response.body).toEqual(expect.objectContaining({
            user_id: expect.any(String),
        }));
    }));
    it("DELETE BATTLE -> should delete a battle", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield actualRequest
            .delete(`/api/battles/${testData_2.battle1._id}`)
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response.body).toEqual(expect.objectContaining({
            _id: expect.any(String),
            question: expect.any(String),
        }));
        expect(response.body).toEqual(expect.objectContaining({
            texte: expect.any(String),
            propositions: expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                }),
            ]),
        }));
        expect(response.body).toEqual(expect.objectContaining({
            user_id: expect.any(String),
        }));
    }));
});
