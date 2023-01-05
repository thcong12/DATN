import mongoose from "mongoose";
const productDetailSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Product",
  },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    require: false,
    ref: "Developer",
  },
  description: {
    type: String,
    require: true,
    default: "",
  },
  categlory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      ref: "Categlory",
    
    },
  ],
  rating: {
    type: Number,
    require: true,
    default: 0.0,
  },
  systemrequiment: [
    {
      os: { type: String, require: true, default: "" },
      cpu: { type: String, require: true, default: "" },
      memory: { type: String, require: true, default: "" },
      gpu: { type: String, require: true, default: "" },
      directX: { type: String, require: true, default: "" },
      storage: { type: String, require: true, default: "" },
      soundCard: { type: String, require: true, default: "" },
    },
  ],
  reviews: [
    {
      title: {
        type: String,
        require: true,
        default: "",
      },
      rating: {
        type: Number,
        require: true,
        default: 0.0,
      },
      comment: {
        type: String,
        require: true,
        default: "",
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
      },
    },
  ],
  imgList: [
    {
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
  ],
});
const ProductDetail = mongoose.model("ProductDetail", productDetailSchema);
export default ProductDetail;
