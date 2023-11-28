import ApiError from "../../../errors/ApiError";
import status from "http-status-codes";
import { User } from "./user.model";
import { IUser } from "./user.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const create = async (payload: IUser): Promise<IUser> => {
  const isUserExist = await User.isUserExist(payload.email);

  if (isUserExist) {
    throw new ApiError(status.BAD_REQUEST, "User already exists");
  }

  const result = await User.create(payload);

  console.log(result);
  return result;
};

const login = async (
  payload: IUser
): Promise<{ accessToken: string; user: Partial<IUser> }> => {
  const isUserExist = await User.isUserExist(payload.email);

  if (!isUserExist) {
    throw new ApiError(status.UNAUTHORIZED, "User does not exist");
  }

  const matchPassword = await User.isPasswordMatched(
    payload.password,
    isUserExist.password as string
  );

  if (!matchPassword) {
    throw new ApiError(status.UNAUTHORIZED, "Password did not match");
  }

  const { _id, name, role, email } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { _id, name, role, email },
    config.secrect_token_key as Secret,
    config.expires_in as string
  );

  return {
    accessToken,
    user: isUserExist,
  };
};

const findALl = async (id: string): Promise<IUser[]> => {
  const result = await User.find({
    _id: { $ne: id },
  });
  return result;
};

const updateById = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    { new: true }
  );

  return result;
};

export const userService = {
  create,
  login,
  findALl,
  updateById,
};
