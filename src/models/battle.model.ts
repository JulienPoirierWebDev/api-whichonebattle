/*
  question: string;
  texte: string;
  propositions: propositionsType;
*/

import { model, Schema, Document } from "mongoose";

interface IBattle extends Document {
  question: string;
  texte: string;
  propositions: Array<{ name: string }>;
  user_id?: string;
  created_at?: Date;
  responses?: string;
}

const battleSchema = new Schema<IBattle>({
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
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  responses: {
    type: Schema.Types.ObjectId,
    ref: "Response",
  },
});

export default model("Battle", battleSchema);
