import { Response } from "express";
import Vote from "../models/vote.model";
import { IRequest } from "./authController";
import Battle from "../models/battle.model";
import { Types } from "mongoose";
class VoteController {
  async vote(req: IRequest, res: Response) {
    // get battle id from req.params
    const battleId = req.params.battleId;

    // get name from req.body
    const { name } = req.body;

    // get user id from req.auth
    const userId = req.auth._id;

    //check if the user has already voted
    const vote = await Vote.findOne({ user_id: userId, battle_id: battleId });

    // if the user has already voted, return an error

    if (vote) {
      return res
        .status(400)
        .json({ error: "You already voted for this battle" });
    }

    //check if the name is one of the propositions of the battle

    const battle = await Battle.findById(battleId);

    if (!battle) {
      return res.status(400).json({ error: "Battle not found" });
    }

    if (
      name !== battle.propositions[0].name &&
      name !== battle.propositions[1].name
    ) {
      return res
        .status(400)
        .json({ error: "The name you provided is not in the propositions" });
    }
    // create a new vote
    const newVote = new Vote({
      user_id: userId,
      battle_id: battleId,
      name,
    });

    // save the vote
    await newVote.save();

    // get the number of votes for the battle
    const voteCount = await Vote.countDocuments({ battle_id: battleId });

    //get the number of votes for each proposition

    const battleIdObj = new Types.ObjectId(battleId);

    const name1 = battle?.propositions[0].name;
    const name2 = battle?.propositions[1].name;
    console.log(name1, name2);

    const votesForFirstProposition = await Vote.countDocuments({
      battle_id: battleIdObj,
      name: name1,
    });

    const votesForSecondProposition = await Vote.countDocuments({
      battle_id: battleIdObj,
      name: name2,
    });

    const votes = [
      { name: name1, count: votesForFirstProposition },
      { name: name2, count: votesForSecondProposition },
    ];

    const reponseJson = {
      newVote,
      voteCount,
      battleResult: votes,
    };

    // return the vote
    return res.json(reponseJson);
  }
}

export default VoteController;
