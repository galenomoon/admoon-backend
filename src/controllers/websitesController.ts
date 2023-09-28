import { Request, Response } from "express";
import WebsiteUseCase from "../useCases/websiteUseCase";
import { IWebsite } from "../interfaces/website";
import { IService } from "../interfaces/service";

const websiteUseCase = new WebsiteUseCase();

export default class WebsiteController {
  async getAll(_: Request, res: Response) {
    const websites = await websiteUseCase.getAll();
    return res.status(200).json(websites);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const website = await websiteUseCase.getById(Number(id));
    return res.status(200).json(website);
  }

  async create(req: Request, res: Response) {
    const { name, url, adminId } = req.body;
    const newWebsite = await websiteUseCase.create({
      name,
      url,
      adminId: Number(adminId),
    } as IWebsite);
    return res.status(201).json(newWebsite);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, url, adminId } = req.body;
    const website = await websiteUseCase.update(Number(id), {
      name,
      url,
      adminId: Number(adminId),
    } as IWebsite);
    return res.status(200).json(website);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const websites = await websiteUseCase.delete(Number(id));
    return res.status(200).json(websites);
  }

  async handleServices(req: Request, res: Response) {
    const { id } = req.params;
    const { services } = req.body;
    const website = await websiteUseCase.handleServices(
      Number(id),
      services as IService[]
    );
    return res.status(200).json(website);
  }
}
