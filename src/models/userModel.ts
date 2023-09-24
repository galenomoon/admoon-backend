import { PrismaClient } from "@prisma/client";
import { IUser } from "../interfaces/user";

const prisma = new PrismaClient();

export default class UserModel {
  async getByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async create({ email, firstName = "", lastName = "", password }: IUser) {
    const user = await prisma.user.create({
      data: { email, firstName, lastName, password, websiteId: 1 },
    });
    return user;
  }

  

  async getById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    };
  }
}
