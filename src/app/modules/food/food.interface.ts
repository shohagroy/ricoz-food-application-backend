import { Document, Model, Types } from "mongoose";
import { ICategory } from "../category/category.interface";

interface IImage {
  public_id: string;
  secure_url: string;
}

export interface IFood extends Document {
  tittle: string;
  category: Types.ObjectId | ICategory;
  description: string | null;
  price: number;
  images: IImage[] | null;
}

export type IFoodModel = Model<IFood, Record<string, unknown>>;

export type IFoodFilters = {
  searchTerm?: string;
  sortBy?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
};
