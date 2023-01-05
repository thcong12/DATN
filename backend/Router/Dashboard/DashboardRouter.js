import express from "express";
import adminCategloryRouter from "./Product/Categlory.js";
import adminDeveloperRouter from "./Product/Developer.js";
import adminFeatureRouter from "./Product/Feature.js";
import adminProductRouter from "./Product/Product.js";
import adminAccountRouter from './Admin/Account.js';
import adminRouter from './Admin/Auth.js';
import adminReportRouter from "./Report/Report.js";
import userRouter from "./Admin/AccountUser.js";


const dashboardRouter = express.Router();
dashboardRouter.use("/auth",adminRouter)
dashboardRouter.use("/account",adminAccountRouter)
dashboardRouter.use("/user",userRouter)
dashboardRouter.use("/categlorys",adminCategloryRouter)
dashboardRouter.use("/developers",adminDeveloperRouter)
dashboardRouter.use("/feature",adminFeatureRouter)
dashboardRouter.use("/products",adminProductRouter)
dashboardRouter.use("/report",adminReportRouter)
export default dashboardRouter;