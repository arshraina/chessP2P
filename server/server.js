import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import init from "./db/config.js";
import uR from "./routes/routes.js";
import gR from "./routes/games.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("static"));

// test api
app.get("/test", (req, res) => {
  res.send("Hello World! Go To /api");
});

// base router
const bR = express.Router();
app.use("/api", bR);

bR.get("/", (req, res) => {
  res.send("v0.0.1");
});

bR.use("/user", uR);
bR.use("/game", gR);

// start server
const PORT = process.env.PORT || 5000;
const HOSTIP = process.env.hostUrl || "localhost";
app.listen(PORT, HOSTIP, () => {
  console.clear();
  init();
  console.log(`Server @ http://${HOSTIP}:${PORT}`);
});
