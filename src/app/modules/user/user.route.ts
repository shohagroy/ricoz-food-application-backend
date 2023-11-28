import express from "express";
import { userController } from "./user.controllers";

const router = express.Router();

router.route("/signup").post(userController.createUser);

export const userRoute = router;
