import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status-codes";
import { foodService } from "./food.services";
import { IFood } from "./food.interface";
import pick from "../../../shared/pick";
import { foodFilterableFields } from "./food.constant";
import { paginationFields } from "../../../constants/pagination";

const create = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const response = await foodService.create(req.body);

    sendResponse<IFood>(res, {
      statusCode: status.OK,
      success: true,
      message: "Food Create Successfully!",
      data: response,
    });
  }
);

const getALlFoods = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(req.query, foodFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const response = await foodService.findAll(filters, paginationOptions);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Foods get Successfully!",
      data: response,
    });
  }
);

const getById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const response = await foodService.findById(id);

    sendResponse<IFood>(res, {
      statusCode: status.OK,
      success: true,
      message: "Food get Successfully!",
      data: response,
    });
  }
);

const deleteFood = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const response = await foodService.deleteById(id);

    sendResponse<IFood>(res, {
      statusCode: status.OK,
      success: true,
      message: "Food delete Successfully!",
      data: response,
    });
  }
);

const updateFood = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const response = await foodService.updateById(id, req.body);

    sendResponse<IFood>(res, {
      statusCode: status.OK,
      success: true,
      message: "Food update Successfully!",
      data: response,
    });
  }
);

export const foodController = {
  create,
  getALlFoods,
  getById,
  deleteFood,
  updateFood,
};
