import mongoose from "mongoose";
const discountSchema = mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
        default: "",
      },
      description: {
        type: String,
        require: true,
        default: "",
      },
      discountPercent: {
        type: Number,
        require: true,
        default: 0.0,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );
  const Discount = mongoose.model("Discount",discountSchema)
  export default Discount;