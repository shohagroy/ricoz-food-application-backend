import { Document, Model } from "mongoose";

type IUserRole = "admin" | "superAdmin" | "user";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: IUserRole;
  phoneNumber: string | null;
  address: string | null;
}

export interface IUserModel extends Model<IUser, {}, {}> {
  isUserExist(
    email: string
  ): Promise<Pick<
    IUser,
    "_id" | "name" | "password" | "role" | "email"
  > | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}
