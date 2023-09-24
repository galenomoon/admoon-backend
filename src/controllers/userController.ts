import { Request, Response } from "express";
import UserUseCase from "../useCases/userUseCase";

const userUseCase = new UserUseCase();

export default class UserController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const auth = await userUseCase.login({ email, password });
    return res.status(200).json(auth);
  }

  async register(req: Request, res: Response) {
    const { email, firstName, lastName, password } = req.body;
    const auth = await userUseCase.register({
      email,
      password,
      firstName,
      lastName,
    });
    return res.status(201).json(auth);
  }

  async currentUser(req: any, res: Response) {
    const currentUserId = req.currentUserId;
    const currentUser = await userUseCase.currentUser(currentUserId);
    return res.status(200).json(currentUser);
  }
}
