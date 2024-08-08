import { Router } from "express";
import UserController from "../controllers/usersController";

const router = Router();
const userController = new UserController();

router
  .get("/", userController.getAll)
  .get("/:id", userController.getOne)
  .post("/", userController.create)
  .put("/:id", userController.update)
  .delete("/:id", userController.delete);

export default router;
