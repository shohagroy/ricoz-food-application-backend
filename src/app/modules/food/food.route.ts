import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { foodController } from "./food.controllers";

const router = express.Router();

router.route("/").get(foodController.getALlFoods);
router.route("/:id").get(foodController.getById);

router
  .route("/create")
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    foodController.create
  );

router
  .route("/:id")
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    foodController.deleteFood
  )
  .patch(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    foodController.updateFood
  );

export const foodRoute = router;
