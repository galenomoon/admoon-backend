import { Request, Response } from "express";
import AdminUseCase from "../useCases/adminUseCase";
import { IUser } from "../interfaces/user";

const adminUseCase = new AdminUseCase();

export default class AdminController {
  async getAll(req: Request, res: Response) {
    const admins = await adminUseCase.getAll();
    return res.status(200).json(admins);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const auth = await adminUseCase.login({ email, password });
    return res.status(200).json(auth);
  }

  async register(req: Request, res: Response) {
    const { email, firstName, lastName, password } = req.body;
    const auth = await adminUseCase.register({
      email,
      password,
      firstName,
      lastName,
    });
    return res.status(201).json(auth);
  }

  async update(req: Request, res: Response) {
    const { firstName, lastName, password } = req.body;
    const { id } = req.params;
    const admin = await adminUseCase.update({
      id: Number(id),
      firstName,
      lastName,
      password,
    } as IUser);
    return res.status(200).json(admin);
  }
}
