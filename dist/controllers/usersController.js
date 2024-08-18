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
const user_model_1 = __importDefault(require("../models/user.model"));
const dbErrorHandler_1 = require("../helpers/dbErrorHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find().select("name email createdAt updatedAt");
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json((0, dbErrorHandler_1.getErrorMessage)(error));
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.find({ _id: req.params.id }).select("name email createdAt updatedAt");
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json((0, dbErrorHandler_1.getErrorMessage)(error));
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new user_model_1.default(req.body);
                yield user.save();
                // create a token
                const jwtSecret = process.env.JWT_SECRET || "default_secret_is_here";
                const token = jsonwebtoken_1.default.sign({ _id: user._id }, jwtSecret);
                res.status(201).json({ user, token });
            }
            catch (error) {
                res.status(500).json((0, dbErrorHandler_1.getErrorMessage)(error));
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.email) {
                    res
                        .status(400)
                        .json((0, dbErrorHandler_1.getErrorMessage)({ error: "Cannont update email" }));
                }
                let user = yield user_model_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
                    new: true,
                }).select("name email createdAt updatedAt");
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                user.save();
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json((0, dbErrorHandler_1.getErrorMessage)(error));
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOneAndDelete({ _id: req.params.id }).select("name email createdAt updatedAt");
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json((0, dbErrorHandler_1.getErrorMessage)(error));
            }
        });
    }
}
exports.default = UserController;
