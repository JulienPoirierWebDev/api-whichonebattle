"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const battleController_1 = __importDefault(require("../controllers/battleController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = (0, express_1.Router)();
const battleController = new battleController_1.default();
const authController = new authController_1.default();
router
    .get("/", authController.decode, battleController.getAll)
    .get("/:id", battleController.getOne)
    .post("/", authController.requireSignin, authController.hasAuthorization, battleController.create)
    .put("/:id", authController.requireSignin, authController.hasAuthorization, battleController.update)
    .delete("/:id", authController.requireSignin, authController.hasAuthorization, battleController.delete);
exports.default = router;
