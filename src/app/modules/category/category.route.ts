import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { categoryController } from "./category.controllers";

const router = express.Router();

router.route("/").get(categoryController.getAllCategories);

router
  .route("/create")
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    categoryController.create
  );

router
  .route("/:id")
  .patch(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    categoryController.updateCategory
  )
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    categoryController.deleteCategory
  );

export const categoryRoute = router;
