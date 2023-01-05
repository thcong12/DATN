import express from "express";
import asyncHandler from "express-async-handler";
import Admin from "../model/Admin/Admin.js";
import AdminType from "../model/Admin/AdminType.js";
import Categlory from "../model/Product/Categlory.js";
import Developer from "../model/Product/Developer.js";
import Discount from "../model/Store/Discount.js";
import Product from "../model/Product/Product.js";

import admins from "./Admin/Admin.js";
import adminType from "./Admin/AdminType.js";
import categlorys from "./Product/Categlory.js";
import developers from "./Product/Developer.js";
import discounts from "./Product/Discount.js";
import products from "./Product/Product.js";
import Slider from "../model/Store/Slide.js";
import sliders from "./store/Slider.js";
import Feature from "../model/Product/Feature.js";
import featureData from "./Product/Feature.js";
import ProductDetail from "../model/Product/ProductDetail.js";
const ImportData = express.Router()

ImportData.post("/adminType",asyncHandler (async (req,res) =>{
    await AdminType.remove({})
    const importAdminType = await AdminType.insertMany(adminType)
    res.send({importAdminType})
}))
ImportData.post("/admins",asyncHandler (async (req,res) =>{
    await Admin.remove({})
    const importAdmin = await Admin.insertMany(admins)
    res.send({importAdmin})
}))
ImportData.post("/categlorys",asyncHandler (async (req,res) =>{
    await Categlory.remove({})
    const importCateglory = await Categlory.insertMany(categlorys)
    res.send({importCateglory})
}))
ImportData.post("/developers",asyncHandler (async (req,res) =>{
    await Developer.remove({})
    const importDeveloper = await Developer.insertMany(developers)
    res.send({importDeveloper})
}))
ImportData.post("/discounts",asyncHandler (async (req,res) =>{
    await Discount.remove({})
    const importDiscount = await Discount.insertMany(discounts)
    res.send({importDiscount})
}))
ImportData.post("/products",asyncHandler (async (req,res) =>{
    await Product.remove({})
    const importdata = await Product.insertMany(products)
    res.send({importdata})
}))
ImportData.post("/slider",asyncHandler (async (req,res) =>{
    await Slider.remove({})
    const importdata = await Slider.insertMany(sliders)
    res.send({importdata})
}))
ImportData.post("/feature",asyncHandler (async (req,res) =>{
    await Feature.remove({})
    const importdata = await Feature.insertMany(featureData)
    res.send({importdata})
}))


export default ImportData