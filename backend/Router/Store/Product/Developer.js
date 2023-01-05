import express from "express";
import asyncHandler from "express-async-handler";
import Developer from "../../../model/Product/Developer.js";


const storeDeveloperRouter = express.Router();

//get all categlorys
storeDeveloperRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const developers = await Developer.find({});
    res.json(developers)
  })
);
//get single categlory
storeDeveloperRouter.get(
    "/:id",
    asyncHandler(async (req, res) => {
      const developer = await Developer.findById(req.params.id);
      if(developer){
        res.json(developer)
      }else{
        res.status(404)
        throw new Error("product not found")
      }
    })
);

export default storeDeveloperRouter;
