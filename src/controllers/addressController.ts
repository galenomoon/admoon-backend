import { Request, Response } from "express";
import AddressUseCase from "../useCases/addressUseCase";

const addressUseCase = new AddressUseCase();

export default class AddressController {
  async create(req: Request, res: Response) {
    const { websiteId } = req.params;
    const { fullAddress, latitude, longitude } = req.body;
    const newAddress = await addressUseCase.create(Number(websiteId), {
      fullAddress,
      latitude: Number(latitude),
      longitude: Number(longitude),
    });
    return res.status(201).json(newAddress);
  }

  async getAdressByWebsiteId(req: Request, res: Response) {
    const { websiteId } = req.params;
    const address = await addressUseCase.getAdressByWebsiteId(
      Number(websiteId)
    );
    return res.status(200).json(address);
  }

  async update(req: Request, res: Response) {
    const { id, websiteId } = req.params;
    const { fullAddress, latitude, longitude } = req.body;
    const address = await addressUseCase.update(Number(websiteId), {
      id: Number(id),
      fullAddress,
      latitude: Number(latitude),
      longitude: Number(longitude),
    });
    return res.status(200).json(address);
  }

  async delete(req: Request, res: Response) {
    const { id, websiteId } = req.params;
    const address = await addressUseCase.delete(Number(websiteId), Number(id));
    return res.status(200).json(address);
  }
}
