import { Food } from "./food.model";
import { IFood } from "./food.interface";
import status from "http-status-codes";
import ApiError from "../../../errors/ApiError";

const create = async (payload: IFood): Promise<IFood> => {
  const response = await Food.create(payload);

  return response;
};

const findAll = async (): Promise<IFood[]> => {
  const result = await Food.find();

  return result;
};

const findById = async (id: string): Promise<IFood | null> => {
  const result = await Food.findById(id);

  return result;
};

const deleteById = async (id: string): Promise<IFood | null> => {
  const result = await Food.findByIdAndDelete(id);

  const deletedFood: IFood | null = result as unknown as IFood;
  return deletedFood;
};

const updateById = async (
  id: string,
  payload: Partial<IFood>
): Promise<IFood | null> => {
  const result = await Food.findByIdAndUpdate(
    id,
    {
      $set: payload,
    },
    { new: true }
  );

  if (!result) {
    throw new ApiError(status.NOT_FOUND, "Food does not exists");
  }
  return result;
};

export const foodService = {
  create,
  findAll,
  findById,
  deleteById,
  updateById,
};
