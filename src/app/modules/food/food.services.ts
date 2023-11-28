import { Food } from "./food.model";
import { IFood, IFoodFilters } from "./food.interface";
import status from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { SortOrder } from "mongoose";

const create = async (payload: IFood): Promise<IFood> => {
  const response = await Food.create(payload);

  return response;
};

const findAll = async (
  filters: IFoodFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, maxPrice, minPrice, sortBy, ...filtersData } = filters;

  const { page, limit, skip, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      tittle: {
        $regex: searchTerm,
        $options: "i",
      },
    });
  }

  if (maxPrice) {
    andConditions.push({
      price: {
        $lte: maxPrice,
      },
    });
  }

  if (minPrice) {
    andConditions.push({
      price: {
        $gte: minPrice,
      },
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Food.find(whereConditions)
    .populate("category")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Food.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const findById = async (id: string): Promise<IFood | null> => {
  const result = await Food.findById(id).populate("category");

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
