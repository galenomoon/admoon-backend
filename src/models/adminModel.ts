import { PrismaClient } from "@prisma/client";
import { IUser } from "../interfaces/user";

const prisma = new PrismaClient();

export default class AdminModel {
  async getAll() {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        websites: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return admins;
  }

  async getByEmail(email: string) {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });
    return admin;
  }

  async create({ email, firstName = "", lastName = "", password }: IUser) {
    const admin = await prisma.admin.create({
      data: { email, firstName, lastName, password },
    });
    return admin;
  }

  async getById(id: number) {
    const admin = await prisma.admin.findUnique({
      where: { id },
    });
    return {
      id: admin?.id,
      firstName: admin?.firstName,
      lastName: admin?.lastName,
      email: admin?.email,
    };
  }

  async update({ id, firstName, lastName, password }: IUser) {
    const admin = await prisma.admin.update({
      where: { id },
      data: { firstName, lastName, password },
    });
    return admin;
  }

  async delete(id: number) {
    await prisma.admin.delete({
      where: { id },
    });

    return await this.getAll();
  }
}
