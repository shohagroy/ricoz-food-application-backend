import { Food } from "./food.model";
import { IFood } from "./food.interface";
import status from "http-status-codes";

const create = async (payload: IFood): Promise<IFood> => {
  const response = await Food.create(payload);

  return response;
};

const deleteById = async (id: string): Promise<IFood | null> => {
  const result = await Food.findByIdAndDelete(id);

  const deletedFood: IFood | null = result as unknown as IFood;
  return deletedFood;
};

export const foodService = {
  create,
  deleteById,
};
