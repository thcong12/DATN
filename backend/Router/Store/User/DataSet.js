import express from "express";
import asyncHandler from "express-async-handler";
import DataSet from "../../../model/Recomend/DataSet.js";
import ProductDetail from "../../../model/Product/ProductDetail.js";
import Library from "../../../model/User/Library.js";
import User from "../../../model/User/User.js";
import mongoose from "mongoose";
import DataSetForProduct from "../../../model/Recomend/DataSetForProduct.js";
import userAuth from "../../../middleware/UserAuth.js";

//datasetRecommend
//get all
const datasetRouter = express.Router();

datasetRouter.get(
  "/",
  asyncHandler(async (req, res) => {

    const data = await DataSet.find({}).exec();
    if (data) {
      res.json(data);
    } else {
      res.send("something wrong");
    }
  })
);

//get by userID && bookID
async function getDatasetByUserIdAndCategloryId(userId, categloryId) {
  const getData = await DataSet.findOne({
    userId: userId,
    categloryId: categloryId,
  });
  return getData;
}
//thêm hoặc update
async function postDataset(req, res) {
  const { productId, rate, buy, click } = req.body;
  const userId = req?.user_id;
  const newDataSet = new DataSet.create({
    userId: userId,
    productId: productId,
    rate: rate,
    buy: buy,
    click: click,
  });
  const newdata = await newDataSet.save();
  return newdata;
}
async function putDataset(userId, categloryId) {
  const updateDataset = await DataSet.findByIdAndUpdate(
    id,
    {
      $set: {
        rate: rate,
        buy: buy,
        click: click,
      },
    },
    {
      new: true,
    }
  );
  return updateDataset;
}

//post
datasetRouter.get(
  "/buy",
  asyncHandler(async (req, res) => {
    const userId = mongoose.Types.ObjectId("6384795bc8f624553043d666");
    const dataLibrary = await Library.aggregate([
      {
        $match: {
          userId: userId,
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
          from: "productdetails",
          localField: "_id",
          foreignField: "productId",
          as: "product",
        },
      },

      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$product.categlory",
        },
      },
      {
        $unwind: "$_id",
      },
      {
        $group: {
          _id: "$_id",
          count: { $sum: 1 },
        },
      },
    ]);
    dataLibrary.map(async (item) => {
      const getData = await getDatasetByUserIdAndCategloryId(userId, item._id);
      if (!getData) {
        const newDataSet = new DataSet({
          userId: userId,
          categloryId: item._id,
          buy: item.count,
          click: 0,
        });
        await newDataSet.save();
      }
    });
    const getDataSet = await DataSet.find({});
    res.json(getDataSet);
  })
);
datasetRouter.get(
  "/getdata",
  asyncHandler(async (req, res) => {
    const data = await DataSet.find();
    if (!data) {
      res.status(404);
    } else {
      res.json(data);
    }
  })
);
datasetRouter.use(userAuth)
datasetRouter.get(
  "/click/:product",
  asyncHandler(async (req, res) => {
    const productId = req.params.product;
    console.log(productId)
    const userId = mongoose.Types.ObjectId(req.user_id);
    console.log(userId)
    const data = await DataSetForProduct.findOne({
      productId: productId,
      userId: userId,
    });
    if(!data){
      const newData = new DataSetForProduct({
        userId:userId,
        productId:productId,
        click:1
      })
      await newData.save()
      console.log('create new data set')
      res.status(201)
    }else{
      data.click +=1
      await data.save()
      console.log('data have update')
      res.status(200)
    }
  })
);
// datasetRouter.post(
//   "/click",
//   asyncHandler(async (req, res) => {
//     const { buy } = req.body;

//     const getData = await getDatasetByUserIDAndBookID(req, res);
//     if (!getData) {
//       const newData = await postDataset(req, res);
//       res.json(newData);
//     } else {
//       click = parseInt(CheckData.click) + parseInt(click);
//       buy = parseInt(CheckData.buy) + parseInt(buy);
//       if (req.body.rate == 0) {
//         rate = parseFloat(CheckData.rate);
//       }
//       const updateData = await putDataset(req, res, CheckData._id);
//       res.json(updateData);
//     }
//   })
// );
// datasetRouter.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     const { rate, buy, click } = req.body;
//     const getData = await getDatasetByUserIDAndBookID(req, res);
//     if (!getData) {
//       const newData = await postDataset(req, res);
//       res.json(newData);
//     } else {
//       click = parseInt(CheckData.click) + parseInt(click);
//       buy = parseInt(CheckData.buy) + parseInt(buy);
//       if (req.body.rate == 0) {
//         rate = parseFloat(CheckData.rate);
//       }
//       const updateData = await putDataset(req, res, CheckData._id);
//       res.json(updateData);
//     }
//   })
// );

export default datasetRouter;
