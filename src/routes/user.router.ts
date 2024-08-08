import { Router } from "express";
import UserController from "../controllers/usersController";
import AuthController from "../controllers/authController";

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.get("/", userController.getAll).post("/", userController.create);

router
  .route("/:id")
  .get(authController.requireSignin, userController.getOne)
  .put(
    authController.requireSignin,
    authController.hasAuthorization,
    userController.update
  )
  .delete(
    authController.requireSignin,
    authController.hasAuthorization,
    userController.delete
  );
export default router;
