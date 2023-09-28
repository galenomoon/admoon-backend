import { Request, Response } from "express";
import ServiceUseCase from "../useCases/serviceUseCase";
import { IService } from "../interfaces/service";

const serviceUseCase = new ServiceUseCase();

export default class ServiceController {
  async getAll(_: Request, res: Response) {
    const services = await serviceUseCase.getAll();
    return res.status(200).json(services);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const service = await serviceUseCase.getById(Number(id));
    return res.status(200).json(service);
  }

  async create(req: Request, res: Response) {
    const { name, description } = req.body;
    const newService = await serviceUseCase.create({
      name,
      description,
    } as IService);
    return res.status(201).json(newService);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;
    const service = await serviceUseCase.update(Number(id), {
      name,
      description,
    } as IService);
    return res.status(200).json(service);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const services = await serviceUseCase.delete(Number(id));
    return res.status(200).json(services);
  }
}
