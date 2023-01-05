import express from "express";
import asyncHandler from "express-async-handler";
import Feature from "../../../model/Product/Feature.js";

const storeFeatureRouter = express.Router();

//get all categlorys
storeFeatureRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await Feature.find({});
    res.json(data);
  })
);
//get single categlory
storeFeatureRouter.get(
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


export default storeFeatureRouter;
