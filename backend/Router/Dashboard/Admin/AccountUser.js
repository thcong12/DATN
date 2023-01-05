import express from "express";
import asyncHandler from "express-async-handler";
import User from "../../../model/User/User.js";

const userRouter = express.Router();

//get all categlorys
userRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const userList = await User.find({});
    res.json(userList)
  })
);
//get single categlory

// //Post data from file
// productRouter.post("/importdata",asyncHandler (async (req,res) =>{
//     await Product.remove({})
//     const importProduct = await Product.insertMany(products)
//     res.send({importProduct})
// }))
export default userRouter;
