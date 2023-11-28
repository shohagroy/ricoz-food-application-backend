import { Schema, model } from "mongoose";
import { ICategory, ICategoryModel } from "./category.interface";

const categorySchama = new Schema<ICategory>(
  {
    tittle: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = model<ICategory, ICategoryModel>(
  "Category",
  categorySchama
);
