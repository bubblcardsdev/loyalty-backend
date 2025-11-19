import express from "express";
import { getOtp, getRestaurantInfo, loginUser, registerUser, verifyOtp } from "../../controllers/user/auth.js";
import { restaurantIdentifier } from "../../middleware/token.js";

const router = express.Router();

router.get("/getRestaurantInfo", restaurantIdentifier, getRestaurantInfo);

router.post("/getOtp", restaurantIdentifier, getOtp);
router.post("/verifyOtp", restaurantIdentifier, verifyOtp);
router.post("/register",restaurantIdentifier, registerUser);
router.post("/login", restaurantIdentifier, loginUser);

export default router;
