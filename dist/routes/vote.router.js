"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const voteController_1 = __importDefault(require("../controllers/voteController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = (0, express_1.Router)();
const voteController = new voteController_1.default();
const authController = new authController_1.default();
router.post("/:battleId/vote", authController.requireSignin, authController.hasAuthorization, voteController.vote);
exports.default = router;
