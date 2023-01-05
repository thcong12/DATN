import express from "express";
import asyncHandler from "express-async-handler";
import { ROLES_LIST } from "../../../config/role_list.js";
import protect from "../../../middleware/Auth.js";
import checkRole from "../../../middleware/AuthRole.js";
import Admin from "../../../model/Admin/Admin.js";
import AdminType from "../../../model/Admin/AdminType.js";
import User from "../../../model/User/User.js";

const adminAccountRouter = express.Router();
adminAccountRouter.use(protect, checkRole(ROLES_LIST.TD));
adminAccountRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const account = await Admin.find({});
    res.json(account);
  })
);
adminAccountRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404);
      throw new Error("this not found");
    }
  })
);
adminAccountRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      userName,
      email,
      password,
      fullname,
      phoneNumber,
      typeAdmin,
      isActive,
    } = req.body;
    const adminExists = await Admin.findOne({ userName });
    const newAdmin = await Admin.create({
      userName,
      email,
      fullname,
      password,
      lastName,
      phoneNumber,
      typeAdmin,
      isActive,
    });
    if (adminExists) {
      res.status(400);
      throw new Error("Already have this User Name ");
    }
    if (newAdmin) {
      res.status(201).json({ adminDetail: newAdmin._doc });
    } else {
      res.status(400);
      throw new Error("SOme thing wrong");
    }
  })
);
adminAccountRouter.get(
  "/typeAdmin",
  asyncHandler(async (req, res) => {
    const typeAdmin = await AdminType.find({});
    res.json(typeAdmin);
  })
);
adminAccountRouter.get(
  "/typeAdmin/:id",
  asyncHandler(async (req, res) => {
    const adminType = await AdminType.findById(req.params.id);
    if (adminType) {
      res.json(adminType);
    } else {
      res.status(404);
      throw new Error("this not found");
    }
  })
);
adminAccountRouter.get(
  "/user",
  asyncHandler(async (req, res) => {
    const listUser = await User.find({})
    console.log(listUser)
    res.json(listUser)
  })
);

export default adminAccountRouter;
