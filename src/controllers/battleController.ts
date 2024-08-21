import Battle from "../models/battle.model";
import { Request, Response } from "express";
import { IRequest } from "./authController";
import Vote from "../models/vote.model";

interface IBattleController {
  getAll(req: Request, res: Response): void;
}

const addValueToProposition = async (battle: any, request:IRequest) => {
  // Convertir l'objet Mongoose en objet JavaScript ordinaire
  const battleObj = battle.toObject();

  const votes = await Vote.find({
    battle_id: battle._id,
    name: { $in: battleObj.propositions.map((p: { name: string }) => p.name) },
  });

  const propositionValues = battleObj.propositions.map(
    (proposition: { name: string }) => {
      const value = votes.filter(
        (vote) => vote.name === proposition.name
      ).length;
      return { ...proposition, value };
    }
  );

  

  if(request.auth && request.auth._id) {
  const userVote = await Vote.findOne({ user_id: request.auth._id, battle_id: battle._id });
    if (userVote) {
      battleObj.userVote = userVote;
    }
  }

  return {
    ...battleObj,
    propositions: propositionValues,
  };
};

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

            let battles = await Battle.find({
              _id: { $nin: votedBattlesIds },
            })
              .limit(Number(limit))
              .skip(skip)
              .sort({ created_at: date })
              .select("question texte propositions user_id created_at");

            // get value of proposition if any vote

            const battlesWithValues = await Promise.all(
              battles.map(async (battle) => {
                return addValueToProposition(battle, req);
              })
            );

            return res.status(200).json(battlesWithValues.reverse());
          }

          let battles = await Battle.find()
            .limit(Number(limit))
            .skip(skip)
            .sort({ created_at: date })
            .select("question texte propositions user_id created_at");

          const battlesWithValues = await Promise.all(
            battles.map(async (battle) => {
              return addValueToProposition(battle, req);
            })
          );
          return res.status(200).json(battlesWithValues.reverse());
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

          const battlesWithValues = await Promise.all(
            battles.map(async (battle) => {
              return addValueToProposition(battle,req);
            })
          );
          return res.status(200).json(battlesWithValues.reverse());
        }

        let battles = await Battle.find()
          .limit(Number(limit))
          .skip(skip)
          .select("question texte propositions user_id created_at");

        const battlesWithValues = await Promise.all(
          battles.map(async (battle) => {
            return addValueToProposition(battle,req);
          })
        );
        return res.status(200).json(battlesWithValues.reverse());
      }

      const battles = await Battle.find().select(
        "question texte propositions user_id"
      );

      const battlesWithValues = await Promise.all(
        battles.map(async (battle) => {
          return addValueToProposition(battle, req);
        })
      );
      res.status(200).json(battlesWithValues.reverse());
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
      const battleWithValues = await addValueToProposition(battle, req);
      res.status(200).json(battleWithValues);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async create(req: IRequest, res: Response) {
    try {
      const battleJson = { ...req.body, user_id: req.auth._id };
      const battle = new Battle(battleJson);

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

      await battle.save();

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
