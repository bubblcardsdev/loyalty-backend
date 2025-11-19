import express from "express";
import { adminLogin, createAdminUser } from "../../controllers/admin/auth.js";
import { restaurantIdentifier } from "../../middleware/token.js";

const authRouter = express.Router();

authRouter.post("/login", restaurantIdentifier, adminLogin);
authRouter.post("/web/login", adminLogin);
authRouter.post("/create-admin-user", restaurantIdentifier, createAdminUser);

export default authRouter; 