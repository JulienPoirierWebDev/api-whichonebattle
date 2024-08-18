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
    const newBattle1 = new battle_model_1.default(testData_2.battle1);
    yield newBattle1.save();
    const newBattle2 = new battle_model_1.default(testData_2.battle2);
    yield newBattle2.save();
    testData_2.battle1._id = newBattle1._id;
    testData_2.battle2._id = newBattle2._id;
    testData_2.battle3.user_id = testData_1.user1._id;
    testData_2.battle4.user_id = testData_1.user1._id;
    testData_2.battle5.user_id = testData_1.user1._id;
    testData_2.battle6.user_id = testData_1.user1._id;
    testData_2.battle7.user_id = testData_1.user1._id;
    testData_2.battle8.user_id = testData_1.user1._id;
    testData_2.battle9.user_id = testData_1.user1._id;
    testData_2.battle10.user_id = testData_1.user1._id;
    testData_2.battle11.user_id = testData_1.user1._id;
    testData_2.battle12.user_id = testData_1.user1._id;
    testData_2.battle13.user_id = testData_1.user1._id;
    testData_2.battle14.user_id = testData_1.user1._id;
    testData_2.battle15.user_id = testData_1.user1._id;
    testData_2.battle16.user_id = testData_1.user1._id;
    testData_2.battle17.user_id = testData_1.user1._id;
    testData_2.battle18.user_id = testData_1.user1._id;
    testData_2.battle19.user_id = testData_1.user1._id;
    testData_2.battle20.user_id = testData_1.user1._id;
    const newBattle3 = new battle_model_1.default(testData_2.battle3);
    yield newBattle3.save();
    testData_2.battle3._id = newBattle3._id;
    const newBattle4 = new battle_model_1.default(testData_2.battle4);
    yield newBattle4.save();
    testData_2.battle4._id = newBattle4._id;
    // do the same for the other battles
    const newBattle5 = new battle_model_1.default(testData_2.battle5);
    yield newBattle5.save();
    testData_2.battle5._id = newBattle5._id;
    const newBattle6 = new battle_model_1.default(testData_2.battle6);
    yield newBattle6.save();
    testData_2.battle6._id = newBattle6._id;
    const newBattle7 = new battle_model_1.default(testData_2.battle7);
    yield newBattle7.save();
    testData_2.battle7._id = newBattle7._id;
    const newBattle8 = new battle_model_1.default(testData_2.battle8);
    yield newBattle8.save();
    testData_2.battle8._id = newBattle8._id;
    const newBattle9 = new battle_model_1.default(testData_2.battle9);
    yield newBattle9.save();
    testData_2.battle9._id = newBattle9._id;
    const newBattle10 = new battle_model_1.default(testData_2.battle10);
    yield newBattle10.save();
    testData_2.battle10._id = newBattle10._id;
    const newBattle11 = new battle_model_1.default(testData_2.battle11);
    yield newBattle11.save();
    testData_2.battle11._id = newBattle11._id;
    const newBattle12 = new battle_model_1.default(testData_2.battle12);
    yield newBattle12.save();
    testData_2.battle12._id = newBattle12._id;
    const newBattle13 = new battle_model_1.default(testData_2.battle13);
    yield newBattle13.save();
    testData_2.battle13._id = newBattle13._id;
    const newBattle14 = new battle_model_1.default(testData_2.battle14);
    yield newBattle14.save();
    testData_2.battle14._id = newBattle14._id;
    const newBattle15 = new battle_model_1.default(testData_2.battle15);
    yield newBattle15.save();
    testData_2.battle15._id = newBattle15._id;
    const newBattle16 = new battle_model_1.default(testData_2.battle16);
    yield newBattle16.save();
    testData_2.battle16._id = newBattle16._id;
    const newBattle17 = new battle_model_1.default(testData_2.battle17);
    yield newBattle17.save();
    testData_2.battle17._id = newBattle17._id;
    const newBattle18 = new battle_model_1.default(testData_2.battle18);
    yield newBattle18.save();
    testData_2.battle18._id = newBattle18._id;
    const newBattle19 = new battle_model_1.default(testData_2.battle19);
    yield newBattle19.save();
    testData_2.battle19._id = newBattle19._id;
    const newBattle20 = new battle_model_1.default(testData_2.battle20);
    yield newBattle20.save();
    testData_2.battle20._id = newBattle20._id;
    // user1 login
    const response = yield (0, supertest_1.default)(app_1.default)
        .post("/api/auth/signin")
        .send({ email: testData_1.user1.email, password: "123456" })
        .expect(200)
        .expect("Content-Type", /json/);
    const token = response.body.token;
    //make user1 vote for battle 1 3 5 9
    const response1 = yield (0, supertest_1.default)(app_1.default)
        .post(`/api/battles/${testData_2.battle1._id}/vote`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: testData_2.battle1.propositions[0].name, user_id: testData_1.user1._id })
        .expect(200)
        .expect("Content-Type", /json/);
    const response3 = yield (0, supertest_1.default)(app_1.default)
        .post(`/api/battles/${testData_2.battle3._id}/vote`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: testData_2.battle3.propositions[0].name, user_id: testData_1.user1._id })
        .expect(200)
        .expect("Content-Type", /json/);
    const response5 = yield (0, supertest_1.default)(app_1.default)
        .post(`/api/battles/${testData_2.battle5._id}/vote`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: testData_2.battle5.propositions[1].name, user_id: testData_1.user1._id })
        .expect(200)
        .expect("Content-Type", /json/);
    const response9 = yield (0, supertest_1.default)(app_1.default)
        .post(`/api/battles/${testData_2.battle9._id}/vote`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: testData_2.battle9.propositions[1].name, user_id: testData_1.user1._id })
        .expect(200)
        .expect("Content-Type", /json/);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield battle_model_1.default.deleteMany({});
    yield user_model_1.default.deleteMany({});
    yield mongoose_1.connection.close();
}));
const actualRequest = (0, supertest_1.default)(app_1.default);
xdescribe("get battles in order and pagination", () => {
    it("GET BATTLE -> should return 5 battles when query parameter limit is set to 5 and query parameter page is set to 0 or not set", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const response = yield actualRequest
            .get(`/api/battles/?limit=5`)
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response.body).toHaveLength(5);
        const response2 = yield actualRequest
            .get(`/api/battles/?limit=5&page=0`)
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response2.body[0]).toMatchObject({
            _id: (_a = testData_2.battle1._id) === null || _a === void 0 ? void 0 : _a.toString(),
            question: testData_2.battle1.question,
        });
        expect(response2.body[1]).toMatchObject({
            _id: (_b = testData_2.battle2._id) === null || _b === void 0 ? void 0 : _b.toString(),
            question: testData_2.battle2.question,
        });
        expect(response2.body[2]).toMatchObject({
            _id: (_c = testData_2.battle3._id) === null || _c === void 0 ? void 0 : _c.toString(),
            question: testData_2.battle3.question,
        });
        expect(response2.body[3]).toMatchObject({
            _id: (_d = testData_2.battle4._id) === null || _d === void 0 ? void 0 : _d.toString(),
            question: testData_2.battle4.question,
        });
        expect(response2.body[4]).toMatchObject({
            _id: (_e = testData_2.battle5._id) === null || _e === void 0 ? void 0 : _e.toString(),
            question: testData_2.battle5.question,
        });
    }));
    it("GET BATTLE -> should return 5 battles when query parameter limit is set to 5 and query parameter page is set to 1", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const response = yield actualRequest
            .get(`/api/battles/?limit=5&page=1`)
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response.body).toHaveLength(5);
        expect(response.body[0]).toMatchObject({
            _id: (_a = testData_2.battle6._id) === null || _a === void 0 ? void 0 : _a.toString(),
            question: testData_2.battle6.question,
        });
        expect(response.body[1]).toMatchObject({
            _id: (_b = testData_2.battle7._id) === null || _b === void 0 ? void 0 : _b.toString(),
            question: testData_2.battle7.question,
        });
        expect(response.body[2]).toMatchObject({
            _id: (_c = testData_2.battle8._id) === null || _c === void 0 ? void 0 : _c.toString(),
            question: testData_2.battle8.question,
        });
        expect(response.body[3]).toMatchObject({
            _id: (_d = testData_2.battle9._id) === null || _d === void 0 ? void 0 : _d.toString(),
            question: testData_2.battle9.question,
        });
        expect(response.body[4]).toMatchObject({
            _id: (_e = testData_2.battle10._id) === null || _e === void 0 ? void 0 : _e.toString(),
            question: testData_2.battle10.question,
        });
    }));
    it("GET BATTLE -> should return 5 battles when query parameter limit is set to 5 and query parameter order is set to desc", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const response = yield actualRequest
            .get(`/api/battles/?limit=5&order=desc`)
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response.body).toHaveLength(5);
        expect(response.body[0]).toMatchObject({
            _id: (_a = testData_2.battle20._id) === null || _a === void 0 ? void 0 : _a.toString(),
            question: testData_2.battle20.question,
        });
        expect(response.body[1]).toMatchObject({
            _id: (_b = testData_2.battle19._id) === null || _b === void 0 ? void 0 : _b.toString(),
            question: testData_2.battle19.question,
        });
        expect(response.body[2]).toMatchObject({
            _id: (_c = testData_2.battle18._id) === null || _c === void 0 ? void 0 : _c.toString(),
            question: testData_2.battle18.question,
        });
        expect(response.body[3]).toMatchObject({
            _id: (_d = testData_2.battle17._id) === null || _d === void 0 ? void 0 : _d.toString(),
            question: testData_2.battle17.question,
        });
        expect(response.body[4]).toMatchObject({
            _id: (_e = testData_2.battle16._id) === null || _e === void 0 ? void 0 : _e.toString(),
            question: testData_2.battle16.question,
        });
    }));
    it("GET BATTLE -> should return 5 battles when query parameter limit is set to 5 and query parameter order is set to asc", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const response = yield actualRequest
            .get(`/api/battles/?limit=5&order=asc`)
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response.body).toHaveLength(5);
        expect(response.body[0]).toMatchObject({
            _id: (_a = testData_2.battle1._id) === null || _a === void 0 ? void 0 : _a.toString(),
            question: testData_2.battle1.question,
        });
        expect(response.body[1]).toMatchObject({
            _id: (_b = testData_2.battle2._id) === null || _b === void 0 ? void 0 : _b.toString(),
            question: testData_2.battle2.question,
        });
        expect(response.body[2]).toMatchObject({
            _id: (_c = testData_2.battle3._id) === null || _c === void 0 ? void 0 : _c.toString(),
            question: testData_2.battle3.question,
        });
        expect(response.body[3]).toMatchObject({
            _id: (_d = testData_2.battle4._id) === null || _d === void 0 ? void 0 : _d.toString(),
            question: testData_2.battle4.question,
        });
        expect(response.body[4]).toMatchObject({
            _id: (_e = testData_2.battle5._id) === null || _e === void 0 ? void 0 : _e.toString(),
            question: testData_2.battle5.question,
        });
    }));
    it("GET BATTLE -> should return 5 battles not voted by user when query parameter limit is set to 5 and query parameter voted is set to false", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const loginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/api/auth/signin")
            .send({
            email: testData_1.user1.email,
            password: testData_1.user1.password,
        })
            .expect(200);
        const user1Jwt = loginResponse.body.token;
        const response = yield actualRequest
            .get(`/api/battles/?limit=5&unvoted=true`)
            .set("Authorization", `Bearer ${user1Jwt}`)
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response.body).toHaveLength(5);
        expect(response.body[0]).toMatchObject({
            _id: (_a = testData_2.battle2._id) === null || _a === void 0 ? void 0 : _a.toString(),
            question: testData_2.battle2.question,
        });
        expect(response.body[1]).toMatchObject({
            _id: (_b = testData_2.battle4._id) === null || _b === void 0 ? void 0 : _b.toString(),
            question: testData_2.battle4.question,
        });
        expect(response.body[2]).toMatchObject({
            _id: (_c = testData_2.battle6._id) === null || _c === void 0 ? void 0 : _c.toString(),
            question: testData_2.battle6.question,
        });
        expect(response.body[3]).toMatchObject({
            _id: (_d = testData_2.battle7._id) === null || _d === void 0 ? void 0 : _d.toString(),
            question: testData_2.battle7.question,
        });
        expect(response.body[4]).toMatchObject({
            _id: (_e = testData_2.battle8._id) === null || _e === void 0 ? void 0 : _e.toString(),
            question: testData_2.battle8.question,
        });
    }));
});
