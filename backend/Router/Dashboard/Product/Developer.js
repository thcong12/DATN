import express from "express";
import asyncHandler from "express-async-handler";
import Developer from "../../../model/Product/Developer.js";
const adminDeveloperRouter = express.Router();

//get all categlorys
adminDeveloperRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const developers = await Developer.find({});
    res.json(developers)
  })
);
//get single categlory
adminDeveloperRouter.get(
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

adminDeveloperRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { devName,devAvatar,devLinkSocialMedia, description } = req.body;
    const developer = new Developer({
      devName,devAvatar,devLinkSocialMedia, description 
    });
    const devExist = await Developer.findOne({ devName });
    const createNewDeveloper = await developer.save();
    if (devExist) {
      res.status(404);
      throw new Error("Developer doesn't add");
    } else {
      res.status(201).json(createNewDeveloper);
    }
  })
);
adminDeveloperRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { devName,devAvatar,devLinkSocialMedia, description  } = req.body;
    const developer = await Developer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          devName,devAvatar,devLinkSocialMedia, description 
        },
      },
      {
        new: true,
      }
    );
    if (developer) {
      res.json(developer);
    } else {
      res.status(404);
      throw new Error("Dev glory not found");
    }
  })
);

export default adminDeveloperRouter;
