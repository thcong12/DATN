import express from "express";
import asyncHandler from "express-async-handler";
import userAuth from "../../../middleware/UserAuth.js";
import Cart from "../../../model/User/Cart.js";
import Library from "../../../model/User/Library.js";
import mongoose from "mongoose";
import Profile from "../../../model/User/Profile.js";
import WishList from "../../../model/User/WishList.js";

const profileRouter = express.Router();
profileRouter.use(userAuth);
//get all categlorys
profileRouter.get(
  "/library",
  asyncHandler(async (req, res) => {
    const userId = req?.user_id;
    const userLibrary = await Library.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },

      {
        $unwind: "$userProduct",
      },
      {
        $group: {
          _id: "$userProduct.product",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
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
      {
        $unwind: "$product",
      },
      {
        $unwind: "$productDetail",
      },
    ]);
    if (!userLibrary) {
      res.status(404);
    } else {
      res.status(200).json(userLibrary);
    }
  })
);
//get single categlory
profileRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const { product, quantity } = req.body;
    const userId = req?.user_id;
    const userCart = await Cart.findOne({ userId: userId });
    let itemIndex = userCart.cartDetail.find((p) => p.product == product);
    if (userCart) {
      if (itemIndex) {
        res.json("Product is already have in cart ");
      } else {
        userCart.cartDetail.push({ product: product, quantity: quantity });
      }
      const result = await userCart.save();
      return res.status(201).send(result);
    } else {
      const newCart = new Cart.create({
        userId: userId,
        cartDetail: [{ product: product, quantity: quantity }],
      });
      return res.status(201).json(newCart);
    }
  })
);
profileRouter.get(
  "/removeproduct/:id",
  asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const userId = req.user_id;
    const userCart = await Cart.findOne({ userId: userId });

    console.log(userCart.cartDetail);
    console.log(productId);
    if (userCart) {
      userCart.cartDetail = userCart.cartDetail.filter((data) => {
        return String(data.product) !== productId;
      });
      const result = await userCart.save();
      return res.status(201).send(result);
    }
    return res.status(400).json("something wrong");
  })
);
profileRouter.put(
  "/user",
  asyncHandler(async (req, res) => {
    const userId = req.user_id;
    const { avatar, fullName, decription, address } = req.body;
    const updateProfile = await Profile.findByIdAndUpdate(
      { userId: userId },
      {
        $set: {
          avatar,
          fullName,
          decription,
          address,
        },
      },
      {
        new: true,
      }
    );
    if (!updateProfile) {
      res.status(404);
    } else {
      res.json(updateProfile);
    }
  })
);
profileRouter.get(
  "/wishlist",
  asyncHandler(async (req, res) => {
    const userId = req?.user_id;
    const userWishlist = await WishList.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
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
    console.log(userWishlist)
    if (userWishlist.length == 0) {
      const newWishList = new WishList({
        userId: userId,
      });
      await newWishList.save()
      console.log('wishlist have create')
      return res.status(201).json(newWishList);
    }
    return res.status(200).json(userWishlist);
  })
);
profileRouter.post(
  "/wishlist",
  asyncHandler(async (req, res) => {
    const { id } = req.body;
    const userId = req?.user_id;
    const userWishlist = await WishList.findOne({ userId: userId });
    let itemIndex = userWishlist.productId.find((p) => p == id);
    if (itemIndex) {
      res.status(400).json("Product is already have in your wish list ");
    } else {
      userWishlist.productId.push(id);
      await userWishlist.save();
      return res.status(201).send(userWishlist);
    }
  })
);
// //Post data from file
// productRouter.post("/importdata",asyncHandler (async (req,res) =>{
//     await Product.remove({})
//     const importProduct = await Product.insertMany(products)
//     res.send({importProduct})
// }))
export default profileRouter;
