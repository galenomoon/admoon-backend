import { Request, Response } from "express";
import SuperUserUseCase from "../useCases/superUserUseCase";

const superUserUseCase = new SuperUserUseCase();

export default class SuperUserController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const auth = await superUserUseCase.login({ email, password });
    return res.status(200).json(auth);
  }

  async register(req: Request, res: Response) {
    const { email, firstName, lastName, password } = req.body;
    const auth = await superUserUseCase.register({
      email,
      password,
      firstName,
      lastName,
    });
    return res.status(201).json(auth);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await superUserUseCase.delete(id);
    return res.status(204).send();
  }
}
