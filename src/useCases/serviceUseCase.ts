import ServiceModel from "../models/serviceModel";
import { IService } from "../interfaces/service";
import { AppError } from "../errors/appError";

//firebase
const serviceModel = new ServiceModel();

export default class ServiceUseCase {
  async getAll() {
    return await serviceModel.getAll();
  }

  async getById(id: number) {
    const service = await serviceModel.getById(id);
    if (!service) throw new AppError("Service not found", 404);
    return service;
  }

  async create({ name, description }: IService) {
    if (!name) throw new AppError("Name is required");
    if (!description) throw new AppError("Description is required");
    return await serviceModel.create({ name, description } as IService);
  }

  async update(id: number, { name, description }: IService) {
    if (!name) throw new AppError("Name is required");
    if (!description) throw new AppError("Description is required");
    return await serviceModel.update(id, { name, description } as IService);
  }

  async delete(id: number) {
    const service = await serviceModel.getById(id);
    if (!service) throw new AppError("Service not found", 404);
    return await serviceModel.delete(id);
  }
}
