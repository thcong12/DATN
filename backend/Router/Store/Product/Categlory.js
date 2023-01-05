import express from "express";
import asyncHandler from "express-async-handler";
import Categlory from "../../../model/Product/Categlory.js";
import ProductDetail from "../../../model/Product/ProductDetail.js";
const storecCategloryRouter = express.Router();

//get all categlorys
storecCategloryRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const categlorys = await Categlory.find({});
    res.json(categlorys);
  })
);
//get single categlory
storecCategloryRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const categlory = await Categlory.findById(req.params.id);
    if (categlory) {
      res.json(categlory);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);
storecCategloryRouter.get(
  "/list/:categlory",
  asyncHandler(async (req, res) => {
    const categloryId = await Categlory.findOne({
      cateName: { $regex: req.params.categlory, $options: "$i" },
    });
    const productList = await ProductDetail.find({
      categlory: { $all: [String(categloryId._id)] },
    });
    if (categloryId) {
      res.json(productList);
    } else {
      res.status(404);
    }
  })
);

export default storecCategloryRouter;
