import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../../../model/Product/Product.js";
import ProductDetail from "../../../model/Product/ProductDetail.js";
import userAuth from "../../../middleware/UserAuth.js";
import mongoose from "mongoose";
const storeProductRouter = express.Router();

//get all products
storeProductRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products.reverse());
  })
);
storeProductRouter.get(
  "/page/:number",
  asyncHandler(async (req, res) => {
    const numberPage = Number(req.params.number);
    const productInOnePage = 16;
    const products = await Product.find();
    res.json({
      productLength: products.length,
      productList: products.slice(
        (numberPage - 1) * productInOnePage,
        numberPage * productInOnePage
      ),
    });
  })
);

//get single product
storeProductRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);
storeProductRouter.get(
  "/detail/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    const productDetail = await ProductDetail.aggregate([
      {
        $match: { productId: mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "developers",
          localField: "developer",
          foreignField: "_id",
          as: "developer",
        },
      },
      { $unwind: "$developer" },

      {
        $lookup: {
          from: "categlories",
          localField: "categlory",
          foreignField: "_id",
          as: "categlory",
        },
      },
      // { $project:  { cateName:1,description:1 } },
    ]);
  
    if (product) {
      res.json({ productDetail: productDetail[0], product: product });
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);
storeProductRouter.get(
  "/categlory/:id",
  asyncHandler(async (req, res) => {
    const cateId = mongoose.Types.ObjectId(req.params.id);
    const product = await ProductDetail.aggregate([
      {
        $match: {
          categlory: cateId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$product._id",
        },
      },
    ]);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);
storeProductRouter.get(
  "/developer/:id",
  asyncHandler(async (req, res) => {
    const devId = mongoose.Types.ObjectId(req.params.id);
    const product = await ProductDetail.aggregate([
      {
        $match: {
          developer: devId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$product._id",
        },
      },
    ]);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);

storeProductRouter.use(userAuth);

storeProductRouter.put(
  "/newcomment/:id",
  asyncHandler(async (req, res) => {
    
    const { title, rating, comment } = req.body;
    const productId = req.params.id;
    const product = await ProductDetail.findOne({ productId: productId });
    if (product) {
      product.reviews.push({
        title: title,
        rating: rating,
        comment: comment,
        user: req.user_id,
      });
     await product.save();
     res.status(200).json(product)
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);

export default storeProductRouter;
