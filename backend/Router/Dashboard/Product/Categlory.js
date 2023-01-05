import express from "express";
import asyncHandler from "express-async-handler";
import Categlory from "../../../model/Product/Categlory.js";

const adminCategloryRouter= express.Router();

//get all categlorys
adminCategloryRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const categlorys = await Categlory.find({});
    res.json(categlorys);
  })
);
//get single categlory
adminCategloryRouter.get(
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

adminCategloryRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { cateName, description } = req.body;
    const categlory = new Categlory({
      cateName,
      description,
    });
    const cateExist = await Categlory.findOne({ cateName });
    const createNewCategolry = await categlory.save();
    if (cateExist) {
      res.status(404);
      throw new Error("Categlory doesn't add");
    } else {
      res.status(201).json(createNewCategolry);
    }
  })
);
adminCategloryRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { cateName, description } = req.body;
    const categlory = await Categlory.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          cateName,
          description,
        },
      },
      {
        new: true,
      }
    );
    if (categlory) {
      res.json(categlory);
    } else {
      res.status(404);
      throw new Error("Cate glory not found");
    }
  })
);

export default adminCategloryRouter;
