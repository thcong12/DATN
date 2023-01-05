import mongoose from "mongoose";

const adminTypeSchema = mongoose.Schema(
  {
    adminType: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const AdminType = mongoose.model("AdminType", adminTypeSchema);

export default AdminType;
