import { PrismaClient } from "@prisma/client";
import { IUser } from "../interfaces/user";

const prisma = new PrismaClient();

export default class SuperUserModel {
  async getByEmail(email: string) {
    const superUser = await prisma.superUser.findUnique({
      where: { email },
    });
    return superUser;
  }

  async create({ email, firstName = "", lastName = "", password }: IUser) {
    const superUser = await prisma.superUser.create({
      data: { email, firstName, lastName, password },
    });
    return superUser;
  }

  async getById(id: number) {
    const superUser = await prisma.superUser.findUnique({
      where: { id },
    });
    return {
      id: superUser?.id,
      firstName: superUser?.firstName,
      lastName: superUser?.lastName,
      email: superUser?.email,
    };
  }

  async delete(id: number) {
    await prisma.superUser.delete({
      where: { id },
    });
  }
}
