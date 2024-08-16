"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vote_model_1 = __importDefault(require("../models/vote.model"));
const battle_model_1 = __importDefault(require("../models/battle.model"));
const mongoose_1 = require("mongoose");
class VoteController {
    vote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // get battle id from req.params
            const battleId = req.params.battleId;
            // get name from req.body
            const { name } = req.body;
            // get user id from req.auth
            const userId = req.auth._id;
            //check if the user has already voted
            const vote = yield vote_model_1.default.findOne({ user_id: userId, battle_id: battleId });
            // if the user has already voted, return an error
            if (vote) {
                return res
                    .status(400)
                    .json({ error: "You already voted for this battle" });
            }
            //check if the name is one of the propositions of the battle
            const battle = yield battle_model_1.default.findById(battleId);
            if (!battle) {
                return res.status(400).json({ error: "Battle not found" });
            }
            if (name !== battle.propositions[0].name &&
                name !== battle.propositions[1].name) {
                return res
                    .status(400)
                    .json({ error: "The name you provided is not in the propositions" });
            }
            // create a new vote
            const newVote = new vote_model_1.default({
                user_id: userId,
                battle_id: battleId,
                name,
            });
            // save the vote
            yield newVote.save();
            // get the number of votes for the battle
            const voteCount = yield vote_model_1.default.countDocuments({ battle_id: battleId });
            //get the number of votes for each proposition
            const battleIdObj = new mongoose_1.Types.ObjectId(battleId);
            const name1 = battle === null || battle === void 0 ? void 0 : battle.propositions[0].name;
            const name2 = battle === null || battle === void 0 ? void 0 : battle.propositions[1].name;
            const votesForFirstProposition = yield vote_model_1.default.countDocuments({
                battle_id: battleIdObj,
                name: name1,
            });
            const votesForSecondProposition = yield vote_model_1.default.countDocuments({
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
        });
    }
}
exports.default = VoteController;
