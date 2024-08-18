import { Request, Response } from "express";
import User from "../models/user.model";
import { getErrorMessage } from "../helpers/dbErrorHandler";
import jwt from "jsonwebtoken";
interface IUsersController {
  getAll(req: Request, res: Response): void;
}

class UserController implements IUsersController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await User.find().select("name email createdAt updatedAt");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(getErrorMessage(error));
    }
  }
  async getOne(req: Request, res: Response) {
    try {
      const user = await User.find({ _id: req.params.id }).select(
        "name email createdAt updatedAt"
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(getErrorMessage(error));
    }
  }
  async create(req: Request, res: Response) {
    try {
      const user = new User(req.body);
      await user.save();
      // create a token

      const jwtSecret = process.env.JWT_SECRET || "default_secret_is_here";

      const token = jwt.sign({ _id: user._id }, jwtSecret);

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json(getErrorMessage(error));
    }
  }
  async update(req: Request, res: Response) {
    try {
      if (req.body.email) {
        res
          .status(400)
          .json(getErrorMessage({ error: "Cannont update email" }));
      }
      let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      }).select("name email createdAt updatedAt");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.save();

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(getErrorMessage(error));
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id }).select(
        "name email createdAt updatedAt"
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(getErrorMessage(error));
    }
  }
}

export default UserController;
