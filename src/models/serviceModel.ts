//interfaces
import { IService } from "./../interfaces/service";

//prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class ServiceModel {
  async getAll() {
    const services = await prisma.service.findMany({
      orderBy: { id: "asc" },
      include: { websites: true },
    });

    return services;
  }

  async getById(id: number) {
    const service = await prisma.service.findUnique({
      where: { id },
      include: { websites: true },
    });
    return service;
  }

  async create({ name, description }: IService) {
    const service = await prisma.service.create({
      data: {
        name,
        description,
      },
    });
    return service;
  }

  async update(id: number, { name, description }: IService) {
    const service = await prisma.service.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
    return service;
  }

  async delete(id: number) {
    await prisma.service.delete({
      where: { id },
    });

    return this.getAll();
  }
}
