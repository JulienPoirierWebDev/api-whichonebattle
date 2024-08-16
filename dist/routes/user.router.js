"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = (0, express_1.Router)();
const userController = new usersController_1.default();
const authController = new authController_1.default();
router.get("/", userController.getAll).post("/", userController.create);
router
    .route("/:id")
    .get(authController.requireSignin, userController.getOne)
    .put(authController.requireSignin, authController.hasAuthorization, userController.update)
    .delete(authController.requireSignin, authController.hasAuthorization, userController.delete);
exports.default = router;
