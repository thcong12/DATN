import express from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import {ROLES_LIST} from "../../../config/role_list.js";
import Admin from "../../../model/Admin/Admin.js";
import {
  generateAccessToken,
  generateRefreshToken
} from "../../../ultils/generateToken.js";

const adminRouter = express.Router();

adminRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    const admin = await Admin.findOne({ userName });
    if (admin && admin.matchPassword(password)) {
      const refreshToken = generateRefreshToken(admin._id);
      const accessToken = generateAccessToken(admin._id, admin.typeAdmin);
      admin.refreshToken = refreshToken;
      const result = await admin.save();
      console.log(result);
      res.header('x-refresh-token',refreshToken).header('x-access-token',accessToken)
        .json({
          adminDetail: admin._doc,
        });
    } else {
      res.status(401);
      throw new Error("Some thing wrong please check user name or password");
    }
  })
);
adminRouter.get(
  "/logout",
  asyncHandler(async (req, res) => {
    const token = req.header('x-refresh-token');
   //No content
    console.log(token);
    // Is refreshToken in db?
    const admin = await Admin.findOne({ refreshToken:token }).exec();
    if (!admin) {
      return res.send(401);
    }else{
      admin.refreshToken = "";
      const result = await admin.save();
      console.log(result);
      res.sendStatus(204);
    }
    // Delete refreshToken in db
  })
);
adminRouter.get(
  "/refresh",
  asyncHandler(async (req, res) => {
    const token = req.header('x-refresh-token');
    // Is refreshToken in db?
    const admin = await Admin.findOne({ refreshToken:token }).exec();
    if (!admin) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || admin.id !== decoded.id) return res.sendStatus(403);
      res
      .header("x-access-token", generateAccessToken(admin._id, admin.typeAdmin))
      .json("Access token have refresh");
    });
  })
);


// adminRouter.get(
//   "/profile",
//   protect,checkRole,
//   asyncHandler(async (req, res) => {
//     const admin = await Admin.find({});
//     res.send(`${admin}`)
//   })
// );

export default adminRouter;
