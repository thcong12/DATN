import mongoose from "mongoose";

const orderDetailSchema = mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Order",
    },
    orderItem: [
      {
        qty: { type: Number, default: 1 },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
      },
    ],
    
  },
  {
    timestamps: true,
  }
);
const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);

export default OrderDetail;
