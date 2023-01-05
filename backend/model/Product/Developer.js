import mongoose from "mongoose";
const developerSchema = mongoose.Schema({
  devName: {
    type: String,
    require: true,
    default: "",
  },
  devAvatar: {
    type: String,
    require: true,
    default: "",
  },
  devLinkSocialMedia: [
    {
      type: String,
      require: false,
      default: "",
    },
  ],
  description: {
    type: String,
    require: true,
    default: "",
  },
});
const Developer = mongoose.model("Developer", developerSchema);
export default Developer;
