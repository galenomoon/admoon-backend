import { PrismaClient } from "@prisma/client";
import { Address } from "../interfaces/address";

const prisma = new PrismaClient();

export default class AddressModel {
  async create(
    websiteId: number,
    { fullAddress, latitude, longitude }: Address
  ) {
    const address = await prisma.address.create({
      data: { fullAddress, latitude, longitude, websiteId },
    });
    return address;
  }

  async getAdressByWebsiteId(websiteId: number) {
    const address = await prisma.address.findFirst({
      where: { websiteId },
    });
    return address;
  }

  async update(
    websiteId: number,
    { id, fullAddress, latitude, longitude }: Address
  ) {
    const address = await prisma.address.update({
      where: { id, websiteId },
      data: {
        fullAddress,
        latitude,
        longitude,
      },
    });
    return address;
  }

  async delete(websiteId: number, id: number) {
    const address = await prisma.address.delete({
      where: { id, websiteId },
    });
    return address;
  }
}
