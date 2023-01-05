import express from "express";
import asyncHandler from "express-async-handler";
import Feature from "../../../model/Product/Feature.js";

const adminFeatureRouter = express.Router();

//get all categlorys
adminFeatureRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await Feature.find({});
    res.json(data);
  })
);
//get single categlory
adminFeatureRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const data = await Feature.findById(req.params.id);
    if (data) {
      res.json(data);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);

adminFeatureRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { featureName, description } = req.body;
    const feature = new Feature({
      featureName,
      description,
    });
    const featureExist = await Feature.findOne({ featureName });
    const createNewFeature = await feature.save();
    if (featureExist) {
      res.status(404);
      throw new Error("Categlory doesn't add");
    } else {
      res.status(201).json(createNewFeature);
    }
  })
);
adminFeatureRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { featureName, description } = req.body;
    const feature = await Feature.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          featureName,
          description,
        },
      },
      {
        new: true,
      }
    );
    if (feature) {
      res.json(feature);
    } else {
      res.status(404);
      throw new Error("Cate glory not found");
    }
  })
);

export default adminFeatureRouter;
