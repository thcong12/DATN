import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../../../model/Product/Product.js";
import ProductDetail from "../../../model/Product/ProductDetail.js";
import { DEAFAULT_VALUE } from "../../../config/role_list.js";

const adminProductRouter = express.Router();
//get all products
adminProductRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
//get single product
adminProductRouter.get(
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
adminProductRouter.get(
  "/detail/:id",
  asyncHandler(async (req, res) => {
    const product = await ProductDetail.findOne({ productId: req.params.id });
    const productDetail = new ProductDetail({
      productId: req.params.id,
      developer: DEAFAULT_VALUE.DEVELOPER,
      categlory: DEAFAULT_VALUE.CATEGLORY,
      feature: DEAFAULT_VALUE.FEATURE,
    });
    if (product) {
      res.json(product);
    } else {
      const createNewProductDetail = await productDetail.save();
      console.log("product have create");
      res.json(createNewProductDetail);
    }
  })
);
//Post data from file
adminProductRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      productName,
      shortDescription,
      discount,
      sale,
      imgX,
      imgY,
      isActive,
      price,
    } = req.body;
    const product = new Product({
      productName,
      shortDescription,
      discount,
      imgX,
      imgY,
      isActive,
      price,
      sale,
    });
    const prodExist = await Product.findOne({ productName });

    if (prodExist) {
      res.status(400);
      throw new Error("Product doesn't add");
    } else {
      const productDetail = new ProductDetail({
        productId: product._id,
        developer: DEAFAULT_VALUE.DEVELOPER,
        categlory: DEAFAULT_VALUE.CATEGLORY,
      });
      const productDetailExist = await ProductDetail.findOne({
        productId: product._id,
      });
      if (productDetailExist) {
        res.status(402);
      }
      const createNewProduct = await product.save();
      const createNewProductDetail = await productDetail.save();
      res.status(201).json({ createNewProduct, createNewProductDetail });
    }
  })
);
adminProductRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { productName, shortDescription, imgX, imgY, isActive, price, sale } =
      req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          productName,
          shortDescription,
          imgX,
          imgY,
          isActive,
          price,
          sale,
        },
      },
      {
        new: true,
      }
    );
    if (product) {
      res.json({ product });
    } else {
      res.status(404);
      throw new Error("Product glory not found");
    }
  })
);
adminProductRouter.put(
  "/detail/:id",
  asyncHandler(async (req, res) => {
    const {
      categlory,
      description,
      developer,
      imgList,
      rating,
      systemrequiment,
    } = req.body;

    const product = await ProductDetail.findOneAndUpdate(
      { productId: req.params.id },
      {
        $set: {
          categlory,
          description,
          developer,
          imgList,
          rating,
          systemrequiment,
        },
      },
      {
        new: true,
      }
    );
    if (product) {
      res.json({ product });
    } else {
      res.status(404);
      throw new Error("Product glory not found");
    }
  })
);
export default adminProductRouter;
