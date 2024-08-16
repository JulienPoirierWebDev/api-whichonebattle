import Battle from "../models/battle.model";
import { Request, Response } from "express";
import { IRequest } from "./authController";
import Vote from "../models/vote.model";
import { log } from "node:console";

interface IBattleController {
  getAll(req: Request, res: Response): void;
}

class BattleController implements IBattleController {
  async getAll(req: IRequest, res: Response) {
    try {
      // get query parameters
      const { limit, page, order, unvoted } = req.query;

      const skip = Number(limit) * Number(page) || 0;

      type DateType = 1 | -1;
      let date: DateType = -1;

      if (order === "asc") {
        date = 1;
      }
      if (limit) {
        if (order) {
          if (unvoted) {
            if (!req.auth._id) {
              return res.status(401).json({
                message: "You should login before asking not votend question",
              });
            }

            const votedBattles = await Vote.find({
              user_id: req.auth._id,
            }).select("battle_id");

            const votedBattlesIds = votedBattles.map((vote) => vote.battle_id);

            const battles = await Battle.find({
              _id: { $nin: votedBattlesIds },
            })
              .limit(Number(limit))
              .skip(skip)
              .sort({ created_at: date })
              .select("question texte propositions user_id created_at");

            return res.status(200).json(battles);
          }

          let battles = await Battle.find()
            .limit(Number(limit))
            .skip(skip)
            .sort({ created_at: date })
            .select("question texte propositions user_id created_at");

          return res.status(200).json(battles);
        }

        if (unvoted) {
          if (!req.auth) {
            return res.status(401).json({
              message: "You should login before asking not votend question",
            });
          }

          const votedBattles = await Vote.find({
            user_id: req.auth._id,
          }).select("battle_id");

          const votedBattlesIds = votedBattles.map((vote) => vote.battle_id);

          const battles = await Battle.find({
            _id: { $nin: votedBattlesIds },
          })
            .limit(Number(limit))
            .skip(skip)
            .select("question texte propositions user_id created_at");

          return res.status(200).json(battles);
        }

        let battles = await Battle.find()
          .limit(Number(limit))
          .skip(skip)
          .select("question texte propositions user_id created_at");

        return res.status(200).json(battles);
      }

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
