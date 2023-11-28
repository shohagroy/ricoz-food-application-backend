import { Document, Model } from "mongoose";

export interface ICategory extends Document {
  tittle: string;
}

export type ICategoryModel = Model<ICategory, Record<string, unknown>>;
