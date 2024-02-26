import express from "express";
import dotenv from "dotenv";
import auth from "../middlewares/auth.js";
import UserController from "../controllers/usercontroller.js";
dotenv.config();

const uR = express.Router();

const uC = new UserController();

uR.post("/register", uC.register);
uR.post("/login", uC.login);
uR.post("/get-user",auth, uC.sendUserInfo);

export default uR;