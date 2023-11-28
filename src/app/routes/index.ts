import express from "express";
import { userRoute } from "../modules/user/user.route";
import { categoryRoute } from "../modules/category/category.route";
import { foodRoute } from "../modules/food/food.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/categories",
    route: categoryRoute,
  },
  {
    path: "/foods",
    route: foodRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
