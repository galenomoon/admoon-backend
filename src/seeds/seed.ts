import { PrismaClient } from "@prisma/client";

//interfaces
import { Category } from "../interfaces/category";

//mocks
import adjectives from "../mocks/adjectives";
import categories from "../mocks/categories";

//models
import ProductModel from "../models/productModel";
import CategoryModel from "../models/categoryModel";


const prisma = new PrismaClient();

const productModel = new ProductModel();
const categoryModel = new CategoryModel();

async function seed() {
  async function cleanDB() {
    console.log("Database cleaned.");

    // Auth
    await prisma.user.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.superUser.deleteMany();

    // E-commerce
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
  }

  async function ecommerce() {
    console.log("E-commerce seeded.");
    let newCategories: Promise<Category>[] = [];
    categories.forEach((name) => {
      const newCategory = categoryModel.create({ name });
      newCategories.push(newCategory);
    });

    newCategories.forEach(async (category) => {
      const currentCategory = await category;
      adjectives.forEach(async (adjective) => {
        await productModel.create({
          name: `${currentCategory.name} ${adjective}`,
          description: `Introduzindo o incrível produto ${adjective} ${currentCategory.name} - a escolha definitiva para quem busca a excelência. Com qualidade incomparável e desempenho excepcional, o ${currentCategory.name} é simplesmente o melhor em sua categoria.`,
          price: Math.floor(Math.random() * 1000),
          images: [""],
          categoryId: Number(currentCategory.id),
        });
      });
    });
  }

  try {
    await cleanDB();
    // await ecommerce();
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
