import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { userService } from "./user.services";
import status from "http-status-codes";
import config from "../../../config";

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

const loginUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const response = await userService.login(req.body);

    const { accessToken, user } = response;

    const cookieOptions = {
      secure: config.node_env === "production",
      httpOnly: true,
    };

    res.cookie("accessToken", accessToken, cookieOptions);

    user.password = "";
    sendResponse<Partial<IUser>>(res, {
      statusCode: status.OK,
      success: true,
      message: "User Login Successfully!",
      data: user,
    });
  }
);

const getAllUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const response = await userService.findALl(req?.user?._id);

    sendResponse<Partial<IUser[]>>(res, {
      statusCode: status.OK,
      success: true,
      message: "Users Get Successfully!",
      data: response,
    });
  }
);

const updateUserInfo = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const response = await userService.updateById(req?.user?._id, req.body);

    sendResponse<Partial<IUser>>(res, {
      statusCode: status.OK,
      success: true,
      message: "Users Get Successfully!",
      data: response,
    });
  }
);

export const userController = {
  createUser,
  loginUser,
  getAllUser,
  updateUserInfo,
};
