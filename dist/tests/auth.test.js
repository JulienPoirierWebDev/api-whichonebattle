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
const testData_1 = require("./testData");
const db_1 = __importDefault(require("../helpers/db"));
const user_model_1 = __importDefault(require("../models/user.model"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = require("mongoose");
const actualRequest = (0, supertest_1.default)(app_1.default);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)(true);
    const newUser1 = new user_model_1.default(testData_1.user1);
    yield newUser1.save();
    testData_1.user1._id = newUser1._id;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.deleteMany();
    yield mongoose_1.connection.db.dropDatabase();
    yield mongoose_1.connection.close();
}));
xdescribe("auth tests suite", () => {
    it("SIGNIN -> should return token and user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield actualRequest
            .post(`/api/auth/signin`)
            .set("Content-Type", "application/json")
            .send({ email: testData_1.user1.email, password: testData_1.user1.password })
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response.body).toEqual(expect.objectContaining({
            token: expect.any(String),
            user: expect.objectContaining({
                _id: expect.any(String),
                name: expect.any(String),
                email: expect.any(String),
            }),
        }));
        // check if cookie is set
        expect(response.header["set-cookie"]).toBeDefined();
        // check if token is valid
        const token = response.body.token;
        const user = response.body.user;
        const response2 = yield actualRequest
            .get(`/api/users/${user._id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response2.body).toEqual(expect.objectContaining({
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        }));
    }));
});
