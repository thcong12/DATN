import mongoose from "mongoose";

const wishListSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    productId:[{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Product",
    }]
  },
  {
    timestamps: true,
  }
);
const WishList = mongoose.model("wishList", wishListSchema);
export default WishList;