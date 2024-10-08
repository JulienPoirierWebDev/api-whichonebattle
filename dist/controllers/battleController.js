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
const battle_model_1 = __importDefault(require("../models/battle.model"));
const vote_model_1 = __importDefault(require("../models/vote.model"));
const addValueToProposition = (battle, request) => __awaiter(void 0, void 0, void 0, function* () {
    // Convertir l'objet Mongoose en objet JavaScript ordinaire
    const battleObj = battle.toObject();
    const votes = yield vote_model_1.default.find({
        battle_id: battle._id,
        name: { $in: battleObj.propositions.map((p) => p.name) },
    });
    const propositionValues = battleObj.propositions.map((proposition) => {
        const value = votes.filter((vote) => vote.name === proposition.name).length;
        return Object.assign(Object.assign({}, proposition), { value });
    });
    if (request.auth && request.auth._id) {
        const userVote = yield vote_model_1.default.findOne({ user_id: request.auth._id, battle_id: battle._id });
        if (userVote) {
            battleObj.userVote = userVote;
        }
    }
    return Object.assign(Object.assign({}, battleObj), { propositions: propositionValues });
});
class BattleController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get query parameters
                const { limit, page, order, unvoted } = req.query;
                const skip = Number(limit) * Number(page) || 0;
                let date = -1;
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
                            const votedBattles = yield vote_model_1.default.find({
                                user_id: req.auth._id,
                            }).select("battle_id");
                            const votedBattlesIds = votedBattles.map((vote) => vote.battle_id);
                            let battles = yield battle_model_1.default.find({
                                _id: { $nin: votedBattlesIds },
                            })
                                .limit(Number(limit))
                                .skip(skip)
                                .sort({ created_at: date })
                                .select("question texte propositions user_id created_at");
                            // get value of proposition if any vote
                            const battlesWithValues = yield Promise.all(battles.map((battle) => __awaiter(this, void 0, void 0, function* () {
                                return addValueToProposition(battle, req);
                            })));
                            return res.status(200).json(battlesWithValues.reverse());
                        }
                        let battles = yield battle_model_1.default.find()
                            .limit(Number(limit))
                            .skip(skip)
                            .sort({ created_at: date })
                            .select("question texte propositions user_id created_at");
                        const battlesWithValues = yield Promise.all(battles.map((battle) => __awaiter(this, void 0, void 0, function* () {
                            return addValueToProposition(battle, req);
                        })));
                        return res.status(200).json(battlesWithValues.reverse());
                    }
                    if (unvoted) {
                        if (!req.auth) {
                            return res.status(401).json({
                                message: "You should login before asking not votend question",
                            });
                        }
                        const votedBattles = yield vote_model_1.default.find({
                            user_id: req.auth._id,
                        }).select("battle_id");
                        const votedBattlesIds = votedBattles.map((vote) => vote.battle_id);
                        const battles = yield battle_model_1.default.find({
                            _id: { $nin: votedBattlesIds },
                        })
                            .limit(Number(limit))
                            .skip(skip)
                            .select("question texte propositions user_id created_at");
                        const battlesWithValues = yield Promise.all(battles.map((battle) => __awaiter(this, void 0, void 0, function* () {
                            return addValueToProposition(battle, req);
                        })));
                        return res.status(200).json(battlesWithValues.reverse());
                    }
                    let battles = yield battle_model_1.default.find()
                        .limit(Number(limit))
                        .skip(skip)
                        .select("question texte propositions user_id created_at");
                    const battlesWithValues = yield Promise.all(battles.map((battle) => __awaiter(this, void 0, void 0, function* () {
                        return addValueToProposition(battle, req);
                    })));
                    return res.status(200).json(battlesWithValues.reverse());
                }
                const battles = yield battle_model_1.default.find().select("question texte propositions user_id");
                const battlesWithValues = yield Promise.all(battles.map((battle) => __awaiter(this, void 0, void 0, function* () {
                    return addValueToProposition(battle, req);
                })));
                res.status(200).json(battlesWithValues.reverse());
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const battle = yield battle_model_1.default.findOne({ _id: req.params.id }).select("question texte propositions user_id");
                if (!battle) {
                    return res.status(404).json({ message: "Battle not found" });
                }
                const battleWithValues = yield addValueToProposition(battle, req);
                res.status(200).json(battleWithValues);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const battleJson = Object.assign(Object.assign({}, req.body), { user_id: req.auth._id });
                const battle = new battle_model_1.default(battleJson);
                yield battle.save();
                res.status(201).json(battle);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let battle = yield battle_model_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
                    new: true,
                }).select("question texte propositions user_id");
                if (!battle) {
                    return res.status(404).json({ message: "Battle not found" });
                }
                yield battle.save();
                res.status(200).json(battle);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const battle = yield battle_model_1.default.findOneAndDelete({
                    _id: req.params.id,
                }).select("question texte propositions user_id");
                if (!battle) {
                    return res.status(404).json({ message: "Battle not found" });
                }
                res.status(200).json(battle);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
}
exports.default = BattleController;
