import { Schema, model } from "mongoose";
import { userRole } from "./user.constant";
import { IUser, IUserModel } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      select: 0,
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: userRole,
    },
    phoneNumber: {
      type: String,
    },

    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isUserExist = async function (email) {
  return await this.findOne(
    { email },
    { email: 1, password: 1, role: 1, name: 1 }
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword,
  savedPassword
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  try {
    const hashedPassword = await bcrypt.hash(user.password as string, 10);
    user.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

export const User = model<IUser, IUserModel>("User", userSchema);
