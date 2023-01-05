import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    totalPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    disCountCode: {
      type: String,
      require: true,
      default: "",
    },
    paymentMethod: {
      type: String,
      require: true,
      default: "",
    },
    address: {
      type: String,
      require: true,
      default: "",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: String,
      require: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);

export default Order;
