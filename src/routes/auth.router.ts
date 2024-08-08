import { Router } from "express";
import AuthController from "../controllers/authController";

const router = Router();
const authController = new AuthController();

router.post("/signin", authController.signin);

router.get("/signout", authController.signout);

export default router;
