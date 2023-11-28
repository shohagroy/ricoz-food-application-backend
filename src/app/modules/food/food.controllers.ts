import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status-codes";
import { foodService } from "./food.services";
import { IFood } from "./food.interface";

const create = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const response = await foodService.create(req.body);

    sendResponse<Partial<IFood>>(res, {
      statusCode: status.OK,
      success: true,
      message: "Food Create Successfully!",
      data: response,
    });
  }
);

const deleteFood = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const response = await foodService.deleteById(id);

    sendResponse<Partial<IFood>>(res, {
      statusCode: status.OK,
      success: true,
      message: "Food delete Successfully!",
      data: response,
    });
  }
);

export const foodController = {
  create,
  deleteFood,
};
