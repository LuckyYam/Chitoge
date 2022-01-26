import { model, Schema } from "mongoose";
import { IFeatureModel } from "../../../typings";

const FeatureSchema = new Schema({
  feature: { type: String, required: true, unique: true },
  state: {
    type: Boolean,
    required: false,
    default: true,
  },
  jids: {
    type: [String],
  },
  id: {
    type: String,
  },
});

// change name
export default model<IFeatureModel>("feature", FeatureSchema);
