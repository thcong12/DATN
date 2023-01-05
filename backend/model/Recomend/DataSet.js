import mongoose from "mongoose";

const datasetRecommendSchema = mongoose.Schema({
    categloryId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Categlory",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    buy: {
        type: Number,
        default: 0,
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


const DataSet = mongoose.model("datasetRecommends",datasetRecommendSchema)
export default DataSet;