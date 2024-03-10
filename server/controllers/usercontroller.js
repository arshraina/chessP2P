import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/usermodel.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

// imports
dotenv.config();

class UserController {
  constructor() {}

  generateOTP() {
    return crypto.randomInt(100000, 999999);
  }
  sendEmail = async (email, purpose) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL,
          pass: process.env.MAILPASS,
        },
      });

      let otp = this.generateOTP();

      const user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({ message: "User does not exist!" });
      user.otp = otp;
      await user.save();
      let mailOptions = {
        from: process.env.MAIL,
        to: email,
        // subject: "OTP for Password Reset",
        subject:
          purpose === "reset"
            ? "OTP for Password Reset"
            : "OTP for Email Verification",
        HTMLBodyElement: `<h1>Your OTP for password reset is ${otp}. It is valid for 5 minutes. If you did not request this, please ignore this email.</h1>`,
        text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes. If you did not request this, please ignore this email.`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  register = async (req, res) => {
    try {
      const { name, email, password, phone, bio } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);

      if (!name || !email || !password || !phone || !bio)
        return res.status(400).json({ message: "Please fill all the fields" });
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res
          .status(400)
          .json({ message: "User already exists with same email!!" });

      const newUser = new User({
        name,
        email,
        phone,
        password: passwordHash,
        bio: bio || "",
      });
      await newUser.save();

      res.status(200).json({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  update = async (req, res) => {
    try {
      const { email, name, bio } = req.body.info;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({ message: "User does not exist!" });
      user.name = name;
      user.bio = bio;
      await user.save();
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({ message: "User does not exist!" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect Password!" });

      await this.sendEmail(email, "login"); // Send OTP for login
      res.status(200).json({
        message: "OTP sent to registered email. Please enter OTP to login.",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // verify otp
  verifyOtp = async (req, res) => {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({ message: "User does not exist!" });
      if (user.otp != otp)
        return res.status(400).json({ message: "Invalid OTP!" });

      const otpTimestamp = user.otpTimestamp;
      const currentTimestamp = Date.now();
      const timeDifference = currentTimestamp - otpTimestamp;
      const otpValidityPeriod = 5 * 60 * 1000; 
      if (timeDifference > otpValidityPeriod) {
        return res.status(400).json({ message: "OTP has expired!" });
      }

      const secretKey = process.env.JWTkey;
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
          pfp: user.pfp,
        },
        secretKey,
        { expiresIn: "12h" }
      );
      res.cookie("jwt", token, { httpOnly: true });
      res.status(200).json({ message: "success" });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // send user info
  sendUserInfo = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({ message: "User does not exist!" });
      res.status(200).json({ message: "success", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json({ message: "success", users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

export default UserController;
