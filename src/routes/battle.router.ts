import { Router } from "express";
import BattleController from "../controllers/battleController";
import AuthController from "../controllers/authController";
const router = Router();
const battleController = new BattleController();
const authController = new AuthController();

router
  .get("/", authController.decode, battleController.getAll)
  .get("/:id", battleController.getOne)
  .post(
    "/",
    authController.requireSignin,
    authController.hasAuthorization,
    battleController.create
  )
  .put(
    "/:id",
    authController.requireSignin,
    authController.hasAuthorization,
    battleController.update
  )
  .delete(
    "/:id",
    authController.requireSignin,
    authController.hasAuthorization,
    battleController.delete
  );

export default router;
