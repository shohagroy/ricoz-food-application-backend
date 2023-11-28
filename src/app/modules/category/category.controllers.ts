import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status-codes";
import { categoryService } from "./category.services";
import { ICategory } from "./category.interface";
import ApiError from "../../../errors/ApiError";

const create = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { tittle } = req.body;

    const isCategoryExist = await categoryService.findByTittle(tittle);

    if (isCategoryExist) {
      throw new ApiError(status.BAD_REQUEST, "Category already exists");
    }

    const response = await categoryService.create(req.body);

    sendResponse<Partial<ICategory>>(res, {
      statusCode: status.OK,
      success: true,
      message: "Category Create Successfully!",
      data: response,
    });
  }
);

export const categoryController = {
  create,
};
