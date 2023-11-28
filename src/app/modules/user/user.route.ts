import express from "express";
import { userController } from "./user.controllers";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.route("/create").post(userController.createUser);
router.route("/login").post(userController.loginUser);
router
  .route("/get-all")
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    userController.getAllUser
  );

export const userRoute = router;
