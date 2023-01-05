import express from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Profile from "../../../model/User/Profile.js";
import User from "../../../model/User/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../ultils/generateToken.js";
import nodemailer from "nodemailer";
import Cart from "../../../model/User/Cart.js";

const userRouter = express.Router();

userRouter.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (user && user.matchPassword(password)) {
      if (!user.isActive) {
        res.status(403);
      }
      const userDetail = await Profile.findOne({ userId: user._id });
      const accessToken = generateAccessToken(user._id, user.email);
      const refreshToken = generateRefreshToken(user._id);
      user.section.push(refreshToken);
      const result = await user.save();
      res
        .header("x-refresh-token", refreshToken)
        .header("x-access-token", accessToken)
        .json({
          userDetail: userDetail,
        });
      console.log(result);
    } else {
      res.status(401);
      throw new Error("Some thing wrong please check user name or password");
    }
  })
);
userRouter.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { userName, email, password, fullName, phoneNumber } = req.body;
    const userExists = await User.findOne({ userName });
    const newUser = await User.create({
      userName,
      email,
      password,
      phoneNumber,
    });
    const profile = await Profile.create({
      fullName,
      userId: newUser._id,
    });

    if (userExists) {
      res.status(400);
      throw new Error("Already have this user name ");
    } else {
      newUser.save(function (err, user) {
        if (err) {
          console.log(err);
          res.send("some thing wrong");
        } else {
          const token = generateRefreshToken(user._id);
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,

            // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL_USERNAME, // generated ethereal user
              pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
            tls: {
              rejectUnauthorized: false,
            },
          });
          const mailOptions = {
            from: process.env.EMAIL_USERNAME, // sender address
            to: user.email, // list of receivers
            subject: "Confirm Your Email", // Subject line
            text: "Hello world?", // plain text body
            html: `<a href="http://localhost:4200/auth/userActice/${token}">Click here to confirm your account</a>`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.json("Please check your email");
            } else {
              console.log("Message sent: %s", info.messageId);
              console.log(
                "Preview URL: %s",
                nodemailer.getTestMessageUrl(info)
              );
              res.json({
                message: "Email has been sent--Please confirm",
              });
            }
          });
          profile.save();
        }
      });
      // const userprofile = await newUserProfile.save();
    }
  })
);
userRouter.post(
  "/forgotpassword",
  asyncHandler(async (req, res) => {
    const { userName, email } = req.body;
    const user = await User.findOne({ userName: userName, email: email });
    if (!user) {
      res.status(404);
    } else {
      const token = generateRefreshToken(user._id);
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,

        // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USERNAME, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_USERNAME, // sender address
        to: user.email, // list of receivers
        subject: "change password", // Subject line
        text: "Hello world?", // plain text body
        html: `<a href="http://localhost:4200/auth/changepassword/${token}">Click here to change your password</a>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.json("Please check your email");
        } else {
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          res.json({
            message: "Email has been sent--Please confirm",
          });
        }
      });
    }
  })
);
userRouter.put(
  "/changepassword/:token",
  asyncHandler(async (req, res) => {
    const { password } = req.body;
    const token = req.params.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token
      req.admin_id = decoded.id;
    });
    const user = await User.findByIdAndUpdate(req.admin_id, {
      $set: {
        password,
      },
    });
    if (user) {
      res.send("Change password success");
    } else {
      res.status(404);
    }
  })
);
userRouter.get(
  "/useractice/:token",
  asyncHandler(async (req, res) => {
    const token = req.params.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token
      req.admin_id = decoded.id;
    });
    const user = await User.findById(req.admin_id);
    if (!user) {
      res.send(404);
    } else {
      await Cart.create({
        userId: user._id,
      });
      user.isActive = true;
      const result = await user.save();

      console.log(`${user._id} have been active ${result}`);
      res
        .json({
          message: "Your account have been active",
        })
        .status(204);
    }
  })
);

userRouter.get(
  "/logout",
  asyncHandler(async (req, res) => {
    const token = req.header("x-refresh-token");
    //No content
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token
      req.user_id = decoded.id;
    });
    const user = await User.findById(req.user_id);
    // Is refreshToken in db?

    if (!user) {
      return res.send(401);
    } else {
      user.section = user.section.filter((item) => {
        item != token;
      });
      const result = user.save();
      console.log(result);
      res.sendStatus(204);
    }
    // Delete refreshToken in db
  })
);
userRouter.get(
  "/refresh",
  asyncHandler(async (req, res) => {
    const token = req.header("x-refresh-token");
    // Is refreshToken in db?

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      res.user_id = decoded.id;
    });
    const user = await User.findById(res.user_id).exec();
    if (!user) return res.send(403);
    else {
      res
        .header("x-access-token", generateAccessToken(user._id, user.email))
        .json("ok");
    }
  })
);
userRouter.get(
  "/userDetail/:id",
  asyncHandler(async (req, res) => {
    const userDetail = await Profile.findOne({userId:req.params.id})
    if(userDetail){
      res.json(userDetail)
    }else{
      res.status(404)
    }
  })
);

export default userRouter;
