import mongoose from "mongoose";
const sliderSchema = mongoose.Schema(
  {
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Product",
    },
    description: {
      type: String,
      require: true,
      default: "",
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
const Slider = mongoose.model("Slider", sliderSchema);
export default Slider;
