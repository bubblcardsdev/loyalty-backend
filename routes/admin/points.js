import express from "express";
import { adminAppAuth, restaurantIdentifier } from "../../middleware/token.js";
import { getPointsData } from "../../controllers/admin/points.js";

const pointsRouter = express.Router();

pointsRouter.get("/", adminAppAuth,getPointsData);

export default pointsRouter; 