import { model, Schema } from "mongoose";

const VoteSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  battle_id: {
    type: Schema.Types.ObjectId,
    ref: "Battle",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default model("Vote", VoteSchema);
