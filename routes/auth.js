import express from "express";
import { registerUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", (req, res) => {
  res.send("login route");
});

export default router;
