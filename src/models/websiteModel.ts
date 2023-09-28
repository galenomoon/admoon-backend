//interfaces
import { AppError } from "../errors/appError";
import { IService } from "../interfaces/service";
import { IWebsite } from "../interfaces/website";

//prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class WebsiteModel {
  async getAll() {
    const websites = await prisma.website.findMany({
      orderBy: { id: "asc" },
      include: { admin: true, services: true },
    });

    return websites;
  }

  async getById(id: number) {
    const website = await prisma.website.findUnique({
      where: { id },
      include: { admin: true, services: true },
    });
    return website;
  }

  async create({ name, url, adminId }: IWebsite) {
    const website = await prisma.website.create({
      data: {
        name,
        url,
        adminId,
      },
    });
    return website;
  }

  async getByURL(url: string) {
    const website = await prisma.website.findUnique({
      where: { url },
    });
    return website;
  }

  async update(id: number, { name, url, adminId }: IWebsite) {
    const website = await prisma.website.update({
      where: { id },
      data: { name, url, adminId },
    });
    return website;
  }

  async delete(id: number) {
    await prisma.website.delete({
      where: { id },
    });

    return this.getAll();
  }

  async handleServices(id: number, services: IService[]) {
    try {
      const completeWebsite = await prisma.website.findUnique({
        where: { id },
      });
      const website = await prisma.website.update({
        where: { id },
        data: {
          ...completeWebsite,
          services: {
            set: services,
          },
        },
        include: { admin: true, services: true },
      });

      return website;
    } catch (error) {
      console.error(error);
      throw new AppError("Error on handle services", 500);
    }
  }
}
