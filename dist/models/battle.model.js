"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const battleSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
    },
    texte: {
        type: String,
        required: true,
    },
    propositions: [
        {
            name: {
                type: String,
                required: true,
            },
        },
    ],
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    responses: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Vote",
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
    },
});
exports.default = (0, mongoose_1.model)("Battle", battleSchema);
