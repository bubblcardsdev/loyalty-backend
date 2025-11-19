import express from "express";
import userRouter from "./user.js";
import pointsRouter from "./points.js";
import authRouter from "./auth.js";

const adminRouter = express.Router();

adminRouter.use("/", authRouter);
adminRouter.use("/user", userRouter);
adminRouter.use("/points", pointsRouter);

export default adminRouter;