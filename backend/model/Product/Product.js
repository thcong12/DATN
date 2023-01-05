import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      require: true,
      default: "",
    },
    shortDescription: {
      type: String,
      require: true,
      default: "",
    },
    price: {
      type: Number,
      require: true,
      default: 0.0,
    },
    sale: {
      salePersent: {
        type: Number,
      },
      startDay: {
        type: String,
      },
      endDay: {
        type: String,
      },
      require: false,
    },
    imgX: {
      title: {
        type: String,
        require: true,
        default: "",
      },
      url: {
        type: String,
        require: true,
        default: "",
      },
    },
    imgY: {
      title: {
        type: String,
        require: true,
        default: "",
      },
      url: {
        type: String,
        require: true,
        default: "",
      },
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
const Product = mongoose.model("Product", productSchema);

export default Product;
