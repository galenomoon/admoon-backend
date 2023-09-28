import { PrismaClient } from "@prisma/client";

//interfaces
import { IService } from "../interfaces/service/index";

//mocks
import servicesMock from "../mocks/services";

//models
import ServiceModel from "../models/serviceModel";

const prisma = new PrismaClient();

const serviceModal = new ServiceModel();

async function seedServices() {
  async function cleanDB() {
    console.log("Services cleaned.");
    await prisma.service.deleteMany();
  }

  async function createServices() {
    const services = servicesMock as IService[];

    for (let i = 0; i < services.length; i++) {
      const service = await serviceModal.create(services[i]);
      console.log(`[✓] - Service ${service.name} created.`);
    }
    console.log("Services created.");
  }

  try {
    await cleanDB();
    await createServices();
    console.log("--------------------");
    console.log("Services seeded.");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedServices();
