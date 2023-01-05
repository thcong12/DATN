import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../model/Admin/Admin.js";
import AdminType from "../model/Admin/AdminType.js";

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.header("x-access-token");
  jwt.verify(authHeader, process.env.JWT_ACCESS, (err, decoded) => {
    if (err) return res.sendStatus(401); //invalid token
    req.admin_id = decoded.id;
    req.typeAdmin = decoded.typeAdmin;
    next();
  });
});

export default protect;
