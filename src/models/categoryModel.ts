//interfaces
import { Category } from "../interfaces/category";

//prisma
import { PrismaClient } from "@prisma/client";

//helpers
import slugParse from "../helpers/slugParse";

const prisma = new PrismaClient();

export default class CategoryModel {
  async getAll(
    websiteId: number,
    slug?: string | undefined,
    sortBy?: string | undefined
  ) {
    if (!slug) {
      const categories = await prisma.category.findMany({
        orderBy: { [sortBy || "id"]: "asc" },
        where: { websiteId },
      });
      return categories;
    }
    const categories = await prisma.category.findMany({
      orderBy: { [sortBy || "id"]: "asc" },
      where: { websiteId, slug },
    });

    return categories;
  }

  async getById(websiteId: number, id: number) {
    const category = await prisma.category.findUnique({
      where: { id, websiteId },
    });
    return category;
  }

  async create(websiteId: number, { name }: Category) {
    const category = await prisma.category.create({
      data: {
        name,
        quantityProducts: 0,
        slug: slugParse(name),
        websiteId,
      },
    });
    return category;
  }

  async updateCategoryCount(id: number) {
    const productsLength = await prisma.product.count({
      where: { categoryId: id },
    });

    await prisma.category.update({
      where: { id },
      data: { quantityProducts: productsLength },
    });
  }

  async getByName(websiteId: number, name: string) {
    const category = await prisma.category.findMany({
      where: { name, websiteId },
    });
    return category;
  }

  async update(websiteId: number, id: number, { name }: Category) {
    const category = await prisma.category.update({
      where: { id },
      data: { name, slug: slugParse(name) },
    });
    return category;
  }

  async delete(websiteId: number, id: number) {
    await prisma.image.deleteMany({
      where: { product: { categoryId: id } },
    });

    await prisma.product.deleteMany({
      where: { categoryId: id },
    });

    await prisma.category.delete({
      where: { id },
    });

    return this.getAll(websiteId);
  }

  async getProducts(websiteId: number, id: number) {
    const products = await prisma.product.findMany({
      where: { categoryId: id, websiteId },
      include: { images: true },
    });
    return products;
  }
}
