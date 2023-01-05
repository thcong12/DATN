import mongoose from "mongoose";

const datasetRecommendSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Product",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    click: {
        type: Number,
        default: 0,
    },
    //

    // featureId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     require: true,
    //     ref: "User",
    // },
    // developerId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     require: true,
    //     ref: "User",
    // },
});


const DataSetForProduct = mongoose.model("dataSetForProduct",datasetRecommendSchema)
export default DataSetForProduct;