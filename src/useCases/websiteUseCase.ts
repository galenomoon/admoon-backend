import WebsiteModel from "../models/websiteModel";
import { IWebsite } from "../interfaces/website";
import { AppError } from "../errors/appError";
import { IService } from "../interfaces/service";
import ServiceUseCase from "./serviceUseCase";

//firebase
const websiteModel = new WebsiteModel();
const serviceUseCase = new ServiceUseCase();

export default class WebsiteUseCase {
  async getAll() {
    return await websiteModel.getAll();
  }

  async getById(id: number) {
    const website = await websiteModel.getById(id);
    if (!website) throw new AppError("Website not found", 404);
    return website;
  }

  async create({ name, url, adminId }: IWebsite) {
    if (!name) throw new AppError("Name is required");
    if (!url) throw new AppError("URL is required");
    if (!adminId) throw new AppError("Admin ID is required");
    if (await websiteModel.getByURL(url))
      throw new AppError("Website already exists", 409);
    return await websiteModel.create({ name, url, adminId } as IWebsite);
  }

  async update(id: number, { name, url, adminId }: IWebsite) {
    if (!name) throw new AppError("Name is required");
    if (!url) throw new AppError("URL is required");
    if (!adminId) throw new AppError("Admin ID is required");
    return await websiteModel.update(id, { name, url, adminId } as IWebsite);
  }

  async delete(id: number) {
    const website = await websiteModel.getById(id);
    if (!website) throw new AppError("Website not found", 404);
    return await websiteModel.delete(id);
  }

  async handleServices(id: number, services: IService[]) {
    const website = await websiteModel.getById(id);
    if (!website) throw new AppError("Website not found", 404);

    const servicesIds = services.map((service) => service.id);
    const servicesDB = await serviceUseCase.getAll();
    const servicesDBIds = servicesDB.map((service) => service.id);
    const servicesIdsNotFound = servicesIds.filter(
      (serviceId) => !servicesDBIds.includes(serviceId)
    );

    if (servicesIdsNotFound.length > 0)
      throw new AppError(
        `Services not found: ${servicesIdsNotFound.join(", ")}`,
        404
      );

    return await websiteModel.handleServices(id, services);
  }
}
