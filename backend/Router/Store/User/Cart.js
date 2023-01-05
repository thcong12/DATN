import express from "express";
import asyncHandler from "express-async-handler";
import userAuth from "../../../middleware/UserAuth.js";
import Cart from "../../../model/User/Cart.js";

const cartRouter = express.Router();
cartRouter.use(userAuth)
//get all categlorys
cartRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const userId = req.user_id;
    const userCart = await Cart.findOne({ userId: userId });
    if (!userCart) {
      const newCart = new Cart.create({
        userId: userId,
      });
    await newCart.save();
      return res.status(201).json(newCart);
    }
    return res.status(200).json(userCart);
  })
);
//get single categlory
cartRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const {product,quantity}  = req.body;
    const userId = req?.user_id;
    const userCart = await Cart.findOne({ userId: userId });
    let itemIndex = userCart.cartDetail.find((p) => p.product == product);
    if (userCart) {
      if (itemIndex) {
        res.json("Product is already have in cart ");
      } else {
        userCart.cartDetail.push({product:product,quantity:quantity});
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
cartRouter.get(
  "/removeproduct/:id",
  asyncHandler(async (req, res) => {
    const productId  = req.params.id;
    const userId = req.user_id;
    const userCart = await Cart.findOne({ userId: userId });
    if (userCart) {
      userCart.cartDetail = userCart.cartDetail.filter(data=>{
       return String(data.product) !== productId
      })
      const result = await userCart.save();
      return res.status(201).send(result);
    }
    return res.status(400).json("something wrong");
  })
);
// //Post data from file
// productRouter.post("/importdata",asyncHandler (async (req,res) =>{
//     await Product.remove({})
//     const importProduct = await Product.insertMany(products)
//     res.send({importProduct})
// }))
export default cartRouter;
