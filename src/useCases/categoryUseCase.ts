import { AppError } from "../errors/appError";
import { Category } from "../interfaces/category";

import WebsiteUseCase from "./websiteUseCase";
import CategoryModel from "../models/categoryModel";

//firebase
import { initializeApp } from "firebase/app";
import config from "../config/firebase.config";
import { getStorage, ref, deleteObject } from "firebase/storage";

// =======================

initializeApp(config.firebaseConfig);
const storage = getStorage();

const websiteUseCase = new WebsiteUseCase();
const categoryModel = new CategoryModel();

export default class CategoryUseCase {
  async getAll(
    websiteId: number,
    slug?: string | undefined,
    sortBy?: string | undefined
  ) {
    await websiteUseCase.getById(websiteId);

    if (sortBy && !["id", "name", "quantityProducts"].includes(sortBy)) {
      throw new AppError("Invalid sortBy");
    }
    return await categoryModel.getAll(websiteId, slug, sortBy);
  }

  async getById(websiteId: number, id: number) {
    await websiteUseCase.getById(websiteId);

    const category = await categoryModel.getById(websiteId, id);
    if (!category) throw new AppError("Category not found", 404);

    return category;
  }

  async create(websiteId: number, { name }: Category) {
    await websiteUseCase.getById(websiteId);

    if (!name) throw new AppError("Name is required");
    const categoryExists = await categoryModel.getByName(websiteId, name);
    if (categoryExists.length > 0) {
      throw new AppError("Category already exists", 409);
    }
    return await categoryModel.create(websiteId, { name });
  }

  async update(websiteId: number, id: number, { name }: Category) {
    await websiteUseCase.getById(websiteId);

    if (!name) throw new AppError("Name is required");
    return await categoryModel.update(websiteId, id, { name });
  }

  async getProducts(websiteId: number, id: number) {
    const category = await categoryModel.getById(websiteId, id);
    if (!category) throw new AppError("Category not found", 404);
    return await categoryModel.getProducts(websiteId, id);
  }

  async delete(websiteId: number, id: number) {
    await websiteUseCase.getById(websiteId);

    const category = await categoryModel.getById(websiteId, id);
    if (!category) throw new AppError("Category not found", 404);

    const products = await this.getProducts(websiteId, Number(category.id));
 
    const requests = products?.map(async (product) => {
      if (product?.images?.length > 0) {
        product.images.map(async (image) => {
          await deleteObject(
            ref(storage, `${category.id}/${product.id}/${image.filename}`)
          );
        });
      }
    });

    try {
      await Promise.all(requests);
      return await categoryModel.delete(websiteId, id);
    } catch (error) {
      throw new AppError("Error on delete firebase images", 500);
    }
  }
}
