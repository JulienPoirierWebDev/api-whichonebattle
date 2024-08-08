import e, { Router } from "express";
import BattleController from "../controllers/battleController";

const router = Router();
const battleController = new BattleController();

router
  .get("/", battleController.getAll)
  .get("/:id", battleController.getOne)
  .post("/", battleController.create)
  .put("/:id", battleController.update)
  .delete("/:id", battleController.delete);

export default router;
