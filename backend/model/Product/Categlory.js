import mongoose from "mongoose";

const categlorySchema = mongoose.Schema({
    cateName: {
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
const Categlory = mongoose.model("Categlory",categlorySchema)
export default Categlory;