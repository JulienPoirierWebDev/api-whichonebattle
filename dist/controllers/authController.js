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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET || "default_secret_is_here";
class AuthController {
    constructor() {
        this.signin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield user_model_1.default.findOne({ email: req.body.email });
                if (!user)
                    return res.status(401).json({ error: "User not found" });
                if (!user.authenticate(req.body.password)) {
                    return res
                        .status(401)
                        .send({ error: "Email and password don't match." });
                }
                const token = jsonwebtoken_1.default.sign({ _id: user._id }, jwtSecret);
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 5);
                res.cookie("t", token, { expires: expirationDate });
                return res.json({
                    token,
                    user: { _id: user._id, name: user.name, email: user.email },
                });
            }
            catch (error) {
                return res.status(401).json({ error: "Could not sign in" });
            }
        });
        this.signout = (req, res) => {
            res.clearCookie("t");
            return res.status(200).json({
                message: "signed out",
            });
        };
        this.requireSignin = (req, res, next) => {
            var _a;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            req.auth = decoded;
            req.profile = decoded;
            next();
        };
        this.decode = (req, res, next) => {
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(" ")[1];
                const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
                req.auth = decoded;
            }
            next();
        };
        this.hasAuthorization = (req, res, next) => {
            const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
            if (!authorized) {
                return res.status(403).json({
                    error: "User is not authorized to perform this action",
                });
            }
            next();
        };
        this.logout = (req, res) => {
            res.clearCookie("token");
            return res.status(200).json({ message: "signed out" });
        };
    }
}
exports.default = AuthController;
