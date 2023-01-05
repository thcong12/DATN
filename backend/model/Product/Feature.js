import mongoose from "mongoose";

const featureSchema = mongoose.Schema({
  featureName: {
    type: String,
    require: true,
    default: "",
  },
  description: {
    type: String,
    require: true,
    default: "",
  },
});
const Feature = mongoose.model("Feature", featureSchema);
export default Feature;
