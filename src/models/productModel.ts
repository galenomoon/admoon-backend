//interfaces
import { Product } from "../interfaces/product";

//prisma
import { PrismaClient } from "@prisma/client";

//models
import CategoryModel from "./categoryModel";

//helpers
import slugParse from "../helpers/slugParse";
import { AppError } from "../errors/appError";

const prisma = new PrismaClient();
const categoryModel = new CategoryModel();

export default class ProductModel {
  async getAll(websiteId: number, name?: string, quantity?: number) {
    if (!name?.trim()) {
      const allProducts = await prisma.product.findMany({
        orderBy: { id: "desc" },
        where: { websiteId },
        include: {
          category: true,
          images: true,
        },
        take: quantity || undefined,
      });

      return allProducts;
    }

    const productsByName = await prisma.product.findMany({
      where: {
        websiteId,
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      include: {
        category: true,
        images: true,
      },
    });

    return productsByName;
  }

  async getById(id?: number) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, images: true },
    });
    return product;
  }

  async getBySlug(slug?: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true, images: true },
    });
    return product;
  }

  async create(
    websiteId: number,
    { name, description, price, categoryId }: Product
  ) {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
        slug: slugParse(name),
        websiteId,
      },
    });

    await categoryModel.updateCategoryCount(product.categoryId);

    return product;
  }

  async update(id: number, { name, description, price, categoryId }: Product) {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        categoryId,
        slug: slugParse(name),
      },
      include: { category: true, images: true },
    });
    return product;
  }

  async delete(websiteId: number, id: number) {
    const product = await this.getById(id);
    await prisma.image.deleteMany({
      where: { productId: id },
    });
    await prisma.product.delete({ where: { id } });
    await categoryModel.updateCategoryCount(Number(product?.categoryId));
    return this.getAll(websiteId);
  }

  async getByCategoryId(categoryId: number | string, name: string | undefined) {
    if (!name)
      return await prisma.product.findMany({
        where: { categoryId: Number(categoryId) },
        include: { category: true, images: true },
      });

    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
      include: { category: true, images: true },
      where: {
        categoryId: Number(categoryId),
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    return products;
  }

  async getByCategorySlug(
    websiteId: number,
    categorySlug: string,
    name: string | undefined
  ) {
    const categories = await prisma.category.findMany({
      where: { slug: categorySlug as string, websiteId },
    });

    if (!categories.length) return null;

    if (!name) {
      return await prisma.product.findMany({
        orderBy: { id: "desc" },
        where: { categoryId: categories?.[0]?.id, websiteId },
        include: { category: true, images: true },
      });
    }

    return await prisma.product.findMany({
      orderBy: { id: "desc" },
      where: {
        categoryId: categories?.[0]?.id,
        websiteId,
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      include: { category: true, images: true },
    });
  }

  async getSlugs(websiteId: number) {
    const slugs = await prisma.website.findUnique({
      where: { id: websiteId },
      select: {
        products: {
          select: {
            slug: true,
            category: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!slugs) throw new AppError("Website not found", 404);

    return slugs.products.map((product) => ({
      productSlug: product.slug,
      categorySlug: product.category.slug,
    }));
  }
}
