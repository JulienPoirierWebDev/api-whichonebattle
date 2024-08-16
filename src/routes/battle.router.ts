import { Router } from "express";
import BattleController from "../controllers/battleController";
import AuthController from "../controllers/authController";
const router = Router();
const battleController = new BattleController();
const authController = new AuthController();

router
  .get("/", authController.decode, battleController.getAll)
  .get("/:id", battleController.getOne)
  .post("/", battleController.create)
  .put("/:id", battleController.update)
  .delete("/:id", battleController.delete);

export default router;
