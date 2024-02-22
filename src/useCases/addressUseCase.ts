//models
import AddressModel from "../models/addressModel";

//types
import { Address } from "../interfaces/address";

//erros
import { AppError } from "../errors/appError";
import { hasAllRequiredKeys } from "../errors/hasAllRequiredKeys";

// =========
const addressModel = new AddressModel();

export default class AddressUseCase {
  async create(websiteId: number, address: Address) {
    hasAllRequiredKeys(address);

    return await addressModel.create(websiteId, address);
  }

  async getAdressByWebsiteId(websiteId: number) {
    return await addressModel.getAdressByWebsiteId(websiteId);
  }

  async update(websiteId: number, address: Address) {
    hasAllRequiredKeys(address);

    return await addressModel.update(websiteId, address);
  }

  async delete(websiteId: number, id: number) {
    const address = await addressModel.delete(websiteId, id);
    if (!address) throw new AppError("Address not found", 404);
    return address;
  }
}
