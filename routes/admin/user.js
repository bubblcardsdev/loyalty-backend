import express from "express";
import { getAllUsers } from "../../controllers/admin/user.js";



const userRouter = express.Router();

userRouter.get("/",getAllUsers);

export default userRouter;