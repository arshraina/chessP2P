import express from "express";
import dotenv from "dotenv";
import auth from "../middlewares/auth.js";
import GameController from "../controllers/gamescontroller.js";
dotenv.config();

const gR = express.Router();

const gC = new GameController();

// uR.post('/testing', uC.testing);

gR.post("/send_invite",auth, gC.sendInvite);
gR.post("/delete_party",auth, gC.deleteParty);
gR.post("/accept_invite",auth, gC.acceptInvite);
gR.post("/leave_party",auth, gC.leaveParty);
gR.post("/get_party",auth, gC.getParty);
gR.post("/start-fight",auth, gC.startFight);
gR.post("/complete-fight",auth, gC.completeFight);

export default gR;
