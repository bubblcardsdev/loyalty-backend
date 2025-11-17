import express from "express";
import userRouter from "./user.js";

const adminRouter = express.Router();

adminRouter.use("/user", userRouter);

export default adminRouter;