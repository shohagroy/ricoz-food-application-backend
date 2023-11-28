import { Category } from "./category.model";
import { ICategory } from "./category.interface";

const create = async (payload: ICategory): Promise<ICategory> => {
  const response = await Category.create(payload);

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

  return result;
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
};
