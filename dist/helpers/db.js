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
const mongoose_1 = __importDefault(require("mongoose"));
const category_model_1 = __importDefault(require("../models/category.model"));
const connect = (test) => __awaiter(void 0, void 0, void 0, function* () {
    let MONGO_URI = process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_PRODUCTION
        : process.env.MONGO_URI_DEVELOPMENT;
    if (test && process.env.NODE_ENV === "test" && process.env.MONGO_URI_TEST) {
        MONGO_URI = process.env.MONGO_URI_TEST + Date.now();
    }
    if (!MONGO_URI) {
        MONGO_URI = "error_no_mongo_uri";
    }
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        yield mongoose_1.default.connection.on("error", (error) => {
            throw new Error(`Error connecting to database: ${error}`);
        });
        yield mongoose_1.default.connection.on("connected", () => {
            console.info(`Connected to database`);
        });
        //check if category is empty
        const categories = yield category_model_1.default.find();
        if (categories.length === 0) {
            const defaultCategories = [
                { name: "Histoire" },
                { name: "Sport" },
                { name: "Cinéma" },
                { name: "Musique" },
                { name: "Littérature" },
                { name: "Art" },
                { name: "Technologie" },
                { name: "Jeux video" },
                { name: "Insolite" },
            ];
            yield category_model_1.default.insertMany(defaultCategories);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = connect;
