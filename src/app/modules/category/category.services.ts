import { Category } from "./category.model";
import { ICategory } from "./category.interface";
import ApiError from "../../../errors/ApiError";
import status from "http-status-codes";

const create = async (payload: ICategory): Promise<ICategory> => {
  const response = await Category.create(payload);

  return response;
};

const findAll = async (): Promise<ICategory[]> => {
  const response = await Category.find();

  return response;
};

const updateById = async (
  id: string,
  payload: Partial<ICategory>
): Promise<ICategory | null> => {
  const result = await Category.findByIdAndUpdate(
    id,
    {
      $set: payload,
    },
    { new: true }
  );

  if (!result) {
    throw new ApiError(status.NOT_FOUND, "Category does not exists");
  }
  return result;
};

const deleteById = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(status.NOT_FOUND, "Category does not exists");
  }

  const deletedCategory: ICategory | null = result as unknown as ICategory;
  return deletedCategory;
};

const findByTittle = async (tittle: string): Promise<ICategory | null> => {
  const response = await Category.findOne({
    tittle,
  });

  return response;
};

export const categoryService = {
  create,
  findByTittle,
  updateById,
  findAll,
  deleteById,
};
