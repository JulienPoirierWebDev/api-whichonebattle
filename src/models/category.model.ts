import { model, Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
});

export default model("Category", categorySchema);
