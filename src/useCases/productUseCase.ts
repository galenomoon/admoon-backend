//models
import ProductModel from "../models/productModel";
import CategoryUseCase from "../useCases/categoryUseCase";

//types
import { Product } from "../interfaces/product";

//erros
import { AppError } from "../errors/appError";
import { hasAllRequiredKeys } from "../errors/hasAllRequiredKeys";

//utils
import { paginatedResults } from "../utils/paginatedResults";

//firebase
import { initializeApp } from "firebase/app";
import config from "../config/firebase.config";
import { getStorage, ref, deleteObject } from "firebase/storage";

// =======================

initializeApp(config.firebaseConfig);
const storage = getStorage();
const productModel = new ProductModel();
const categoryUseCase = new CategoryUseCase();

export default class ProductUseCase {
  async getAll(
    websiteId: number,
    name?: string,
    quantity?: number,
    page?: number,
    perPage?: number
  ) {
    const products = await productModel.getAll(websiteId, name, quantity);
    if (!products) throw new AppError("Product not found", 404);
    return paginatedResults(page, products as [], perPage || products.length);
  }

  async create(websiteId: number, product: Product) {
    hasAllRequiredKeys(product);

    await categoryUseCase.getById(websiteId, product.categoryId);

    return await productModel.create(websiteId, product);
  }

  async update(websiteId: number, id: number, product: Product) {
    hasAllRequiredKeys(product);

    await categoryUseCase.getById(websiteId, product.categoryId);

    return await productModel.update(id, product);
  }

  async delete(websiteId: number, id: number) {
    const product = await productModel.getById(id);
    if (!product) throw new AppError("Product not found", 404);

    const storageRef = ref(storage, `${product.category.id}/${product.id}`);
    const deleteImages = product.images.map(async (image) => {
      const fileRef = ref(storageRef, image.filename);
      await deleteObject(fileRef);
    });

    await Promise.all(deleteImages);

    return await productModel.delete(websiteId, id);
  }

  async getBySlug(slug: string) {
    if (!slug) throw new AppError("slug is required", 400);
    const product = await productModel.getBySlug(slug);
    if (!product) throw new AppError("Product not found", 404);
    return product;
  }

  async getById(id: number) {
    if (!id) throw new AppError("id is required", 400);
    const product = await productModel.getById(id);
    if (!product) throw new AppError("Product not found", 404);
    return product;
  }

  async getByCategoryId(
    websiteId: number,
    categoryId: number,
    name: string | undefined,
    page?: number,
    perPage?: number
  ) {
    if (!categoryId) throw new AppError("categoryId is required", 400);

    await categoryUseCase.getById(websiteId, categoryId);

    const products = await productModel.getByCategoryId(categoryId, name);
    return paginatedResults(page, products as [], perPage || products.length);
  }

  async getByCategorySlug(
    websiteId: number,
    categorySlug: string,
    name: string | undefined,
    page?: number,
    perPage?: number
  ) {
    if (!categorySlug) throw new AppError("categorySlug is required", 400);
    const products = await productModel.getByCategorySlug(
      websiteId,
      categorySlug,
      name
    );
    if (products === null) throw new AppError("Category not found", 404);

    return paginatedResults(page, products as [], perPage || products.length);
  }

  async getSlugs(websiteId: number) {
    const slugs = await productModel.getSlugs(websiteId);

    if (!slugs) throw new AppError("Slugs not found", 404);
    return slugs;
  }
}
