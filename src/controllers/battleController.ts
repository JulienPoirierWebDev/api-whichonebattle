import Battle from "../models/battle.model";
import { Request, Response } from "express";

interface IBattleController {
  getAll(req: Request, res: Response): void;
}

class BattleController implements IBattleController {
  async getAll(req: Request, res: Response) {
    try {
      const battles = await Battle.find().select(
        "question texte propositions user_id"
      );
      res.status(200).json(battles);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const battle = await Battle.findOne({ _id: req.params.id }).select(
        "question texte propositions user_id"
      );
      if (!battle) {
        return res.status(404).json({ message: "Battle not found" });
      }
      res.status(200).json(battle);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const battle = new Battle(req.body);

      await battle.save();
      res.status(201).json(battle);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let battle = await Battle.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      ).select("question texte propositions user_id");

      if (!battle) {
        return res.status(404).json({ message: "Battle not found" });
      }

      battle.save();

      res.status(200).json(battle);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const battle = await Battle.findOneAndDelete({
        _id: req.params.id,
      }).select("question texte propositions user_id");
      if (!battle) {
        return res.status(404).json({ message: "Battle not found" });
      }
      res.status(200).json(battle);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default BattleController;
