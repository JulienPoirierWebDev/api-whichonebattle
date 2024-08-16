"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const battle_router_1 = __importDefault(require("./routes/battle.router"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const vote_router_1 = __importDefault(require("./routes/vote.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use("/api/users", user_router_1.default);
app.use("/api/battles", battle_router_1.default);
app.use("/api/auth", auth_router_1.default);
app.use("/api/battles", vote_router_1.default);
app.get("/", (req, res) => {
    res.send("Hello world");
});
exports.default = app;
