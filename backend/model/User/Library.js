import mongoose from "mongoose";

const librarySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    userProduct:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: "Product",
            },
            orderId:{
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: "Order",
            }

        }
    ]
  },
  {
    timestamps: true,
  }
);
const Library = mongoose.model("Library", librarySchema);
export default Library;