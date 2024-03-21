import { AppError } from "../errors/appError";
import { Contact } from "../interfaces/contact";
import { paginatedResults } from "../utils/paginatedResults";

import contactModel from "../models/contactModel";

const contactModel = new contactModel();

export default class contactUseCase {
  async getAll(page?: number) {
    const contacts = await contactModel.getAll();
    if (!contacts) throw new AppError("Contact not found", 404);
    return paginatedResults(page, contacts as []);
  }
}
