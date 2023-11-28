import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { userService } from "./user.services";
import status from "http-status-codes";

const createUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const response = await userService.create(req.body);

    response.password = "";

    sendResponse<Partial<IUser>>(res, {
      statusCode: status.OK,
      success: true,
      message: "User created successfully!",
      data: response,
    });
  }
);

export const userController = {
  createUser,
};
