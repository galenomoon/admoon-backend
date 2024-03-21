import { PrismaClient } from "@prisma/client";
import { IContact } from "../interfaces/contact";

const prisma = new PrismaClient();

export default class ContactModel {
  async getAll() {
    return await prisma.contact.findMany({
      orderBy: { id: "asc" },
    });
  }

  async getById(id: number) {
    return await prisma.contact.findUnique({
      where: { id },
    });
  }

  async create({
    email,
    phone,
    office,
    social_networks,
    link_social_networks,
  }: IContact) {
    return await prisma.contact.create({
      data: {
        email,
        phone,
        office,
        social_networks,
        link_social_networks,
      },
    });
  }

  async update(
    id: number,
    { email, phone, office, social_networks, link_social_networks }: IContact
  ) {
    return await prisma.contact.update({
      where: { id },
      data: {
        email,
        phone,
        office,
        social_networks,
        link_social_networks,
      },
    });
  }

  async delete(id: number) {
    return await prisma.contact.delete({
      where: { id },
    });
  }
}
