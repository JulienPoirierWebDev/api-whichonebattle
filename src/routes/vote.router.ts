import { Router } from "express";

import VoteController from "../controllers/voteController";
import AuthController from "../controllers/authController";
const router = Router();

const voteController = new VoteController();
const authController = new AuthController();

router.post(
  "/:battleId/vote",
  authController.requireSignin,
  authController.hasAuthorization,
  voteController.vote
);

export default router;
