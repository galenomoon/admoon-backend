import WebsiteModel from "../models/websiteModel";
import { IWebsite } from "../interfaces/website";
import { AppError } from "../errors/appError";

//firebase
const websiteModel = new WebsiteModel();

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
}
