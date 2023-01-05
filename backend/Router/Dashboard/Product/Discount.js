import express from "express";
import asyncHandler from "express-async-handler";
import Discount from "../../../model/Store/Discount.js";

const discountRouter = express.Router();

//get all categlorys
discountRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const discounts = await Discount.find({});
    res.json(discounts)
  })
);
//get single categlory
discountRouter.get(
    "/:id",
    asyncHandler(async (req, res) => {
      const discount = await Discount.findById(req.params.id);
      if(discount){
        res.json(discount)
      }else{
        res.status(404)
        throw new Error("product not found")
      }
    })
);
// //Post data from file
// productRouter.post("/importdata",asyncHandler (async (req,res) =>{
//     await Product.remove({})
//     const importProduct = await Product.insertMany(products)
//     res.send({importProduct})
// }))
export default discountRouter;
