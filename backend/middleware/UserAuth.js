import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../model/Admin/Admin.js";
import AdminType from "../model/Admin/AdminType.js";


const userAuth = asyncHandler(async (req, res, next) => {
    const authHeader = req.header("x-access-token");
    jwt.verify(authHeader, process.env.JWT_ACCESS, (err, decoded) => {
      if (err) return res.sendStatus(401); //invalid token
      req.user_id = decoded.id;
      req.user_email = decoded.email;
      next();
    });
  });
export default userAuth;
