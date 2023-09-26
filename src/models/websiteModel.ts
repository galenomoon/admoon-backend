//interfaces
import { IWebsite } from "../interfaces/website";

//prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class WebsiteModel {
  async getAll() {
    const websites = await prisma.website.findMany({
      orderBy: { id: "asc" },
      include: { admin: true}
    });

    return websites;
  }

  async getById(id: number) {
    const website = await prisma.website.findUnique({
      where: { id },
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
}
