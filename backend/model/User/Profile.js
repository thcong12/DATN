import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    fullName: {
      type: String,
      require: true,
      default: "",
    },
    avatar: {
      type: String,
      require: false,
      default: "",
    },
    decription: {
      type: String,
      require: true,
      default: "",
    },
    address: [
      {
        type: String,
        require: true,
        default: "",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Profile = mongoose.model("Profile", profileSchema);
export default Profile;