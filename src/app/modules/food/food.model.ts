import { Schema, model } from "mongoose";
import { IFood, IFoodModel } from "./food.interface";

const foodSchama = new Schema<IFood>(
  {
    tittle: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [
        {
          public_id: {
            type: String,
          },
          secure_url: {
            type: String,
          },
        },
      ],
      default: [],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Food = model<IFood, IFoodModel>("Food", foodSchama);
