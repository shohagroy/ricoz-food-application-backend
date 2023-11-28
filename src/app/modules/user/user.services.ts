import ApiError from "../../../errors/ApiError";
import status from "http-status-codes";
import { User } from "./user.model";
import { IUser } from "./user.interface";

const create = async (payload: IUser): Promise<IUser> => {
  const isUserExist = await User.isUserExist(payload.email);

  if (isUserExist) {
    throw new ApiError(status.BAD_REQUEST, "User already exists");
  }

  const result = await User.create(payload);

  console.log(result);
  return result;
};

export const userService = {
  create,
};
