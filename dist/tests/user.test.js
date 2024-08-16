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
const mongoose_1 = require("mongoose");
const testData_1 = require("./testData");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)(true);
    const newUser1 = new user_model_1.default(testData_1.user1);
    yield newUser1.save();
    testData_1.user1._id = newUser1._id;
    const newUser2 = new user_model_1.default(testData_1.user2);
    yield newUser2.save();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.deleteMany();
    yield mongoose_1.connection.dropDatabase();
    yield mongoose_1.connection.close();
}));
const actualRequest = (0, supertest_1.default)(app_1.default);
xdescribe("users tests suite", () => {
    it("GET USERS -> should return multiple users", () => {
        return actualRequest
            .get(`/api/users/`)
            .expect(200)
            .expect("Content-Type", /json/)
            .then((response) => {
            expect(response.body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    _id: expect.any(String),
                    name: expect.any(String),
                    email: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                }),
            ]));
        });
    });
    it("GET ONE USER with ID -> should return one user when auth", () => __awaiter(void 0, void 0, void 0, function* () {
        const authResponse = yield actualRequest
            .post("/api/auth/signin")
            .set("Content-Type", "application/json")
            .send({ email: testData_1.user1.email, password: testData_1.user1.password })
            .expect(200)
            .expect("Content-Type", /json/);
        const id = authResponse.body.user._id;
        const token = authResponse.body.token;
        const response = yield actualRequest
            .get(`/api/users/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .expect("Content-Type", /json/);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                _id: expect.any(String),
                name: "Julien POIRIER",
                email: "test@email.com",
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            }),
        ]));
    }));
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
            expect(response.body).toEqual(expect.objectContaining({
                _id: expect.any(String),
                name: expect.any(String),
                email: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            }));
        });
    });
    it("MODIFY USER WITH BODY -> should return modified user when auth", () => __awaiter(void 0, void 0, void 0, function* () {
        const authResponse = yield actualRequest
            .post("/api/auth/signin")
            .set("Content-Type", "application/json")
            .send({ email: testData_1.user1.email, password: testData_1.user1.password })
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
    }));
    it("DELETE USER WITH ID -> should return deleted user when auth", () => __awaiter(void 0, void 0, void 0, function* () {
        const authResponse = yield actualRequest
            .post("/api/auth/signin")
            .set("Content-Type", "application/json")
            .send({ email: testData_1.user1.email, password: testData_1.user1.password })
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
    }));
});
