import express, { query } from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Product from "../../../model/Product/Product.js";
import ProductDetail from "../../../model/Product/ProductDetail.js";
import Slider from "../../../model/Store/Slide.js";
import Library from "../../../model/User/Library.js";

const toolRouter = express.Router();

toolRouter.get(
  "/getProductSale",
  asyncHandler(async (req, res) => {
    const today = new Date();
    const produtSale = await Product.find({}).exec();
    const result = produtSale.filter((product) => product.sale.salePersent > 0);
    if (result) {
      const checkExprieDay = result.filter(
        (product) =>
          new Date(product.sale.startDay).getTime() < today.getTime() &&
          new Date(product.sale.endDay).getTime() >= today.getTime()
      );
      res.json(checkExprieDay);
    } else {
      res.statusCode(404);
    }
  })
);
toolRouter.get(
  "/getProductSlide",
  asyncHandler(async (req, res) => {
    const slider = await Slider.find({});
    res.json(slider);
  })
);
toolRouter.get(
  "/search/:name",
  asyncHandler(async (req, res) => {
    const productName = req.params.name;
    const result = await Product.find({
      productName: { $regex: productName, $options: "$i" },
    });
    if (result) {
      res.json(result);
    } else {
      res.send("not found");
    }
  })
);
toolRouter.get(
  "/sameproduct/:cate",
  asyncHandler(async (req, res) => {
    const listCate = req.params.cate.split("+").slice(0,3).map(item =>{
      return mongoose.Types.ObjectId(item);
    });

    const product = await ProductDetail.aggregate([
      {
        $match: {
          categlory: {$all: listCate.slice(0,3)},
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productId",
        },
      },
      {
        $unwind: "$productId",
      },
    ]);
    console.log(listCate)
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);
toolRouter.get(
  "/samedeveloper/:developer",
  asyncHandler(async (req, res) => {
    const devId = mongoose.Types.ObjectId(req.params.developer);
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
          as: "productId",
        },
      },
      {
        $unwind: "$productId",
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
toolRouter.get(
  "/bestseller",
  asyncHandler(async (req, res) => {
    const userLibrary = await Library.aggregate([
      {
        $unwind: "$userProduct",
      },
      {
        $group: {
          _id: "$userProduct.product",
          count: { $sum: 1 },
        },
      },
    ]);
    const newList = userLibrary.sort((a, b) => {
      return b.count - a.count;
    });
    res.json(newList.slice(0, 20));
  })
);
toolRouter.post(
  "/filter",
  asyncHandler(async (req, res) => {
    const { value, listCateglory, developer } = req.body;
    // const productDetail = await ProductDetail.find({
    //   categlory: { $all: listCateglory },
    // });
    const query = [
      {
        $match: {
          $or: [
            {
              price: { $gt: value[0], $lt: value[1] },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "productdetails",
          localField: "_id",
          foreignField: "productId",
          as: "productDetail",
        },
      },
      { $unwind: "$productDetail" },
    ];

    if (developer && listCateglory == 0) {
      const devId = mongoose.Types.ObjectId(developer._id);
      query.push({
        $match: {
          "productDetail.developer": devId,
        },
      });

      const commonProduct1 = await Product.aggregate([...query]);
      console.log("case1");
      res.json(commonProduct1);
    } else if (listCateglory && developer === "") {
      let aaa = listCateglory.map((item) => {
        return mongoose.Types.ObjectId(item._id);
      });
      query.push({
        $match: {
          "productDetail.categlory": { $all: aaa },
        },
      });
      const commonProduct2 = await Product.aggregate([...query]);
      console.log("case2");
      res.json(commonProduct2);
    } else if (developer !== "" && listCateglory.length != 0) {
      let aaa = listCateglory.map((item) => {
        return mongoose.Types.ObjectId(item._id);
      });
      const devId = mongoose.Types.ObjectId(developer._id);
      query.push({
        $match: {
          "productDetail.categlory": { $all: aaa },
        },
      });
      query.push({
        $match: {
          "productDetail.developer": devId,
        },
      });
      const commonProduct3 = await Product.aggregate([...query]);
      console.log("case3");
      res.json(commonProduct3);
    } else if (developer === "" && listCateglory.length == 0) {
      const commonProduct4 = await Product.aggregate([...query]);
      res.json(commonProduct4);
      console.log("case4");
    }
  })
);
export default toolRouter;
