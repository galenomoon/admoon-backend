import { Request, Response } from "express";
import AdminUseCase from "../useCases/adminUseCase";

const adminUseCase = new AdminUseCase();

export default class AdminController {
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

  async currentUser(req: any, res: Response) {
    const currentUserId = req.currentUserId;
    const currentUser = await adminUseCase.currentUser(currentUserId);
    return res.status(200).json(currentUser);
  }
}
