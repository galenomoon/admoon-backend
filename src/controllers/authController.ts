import { Response } from "express";
import AuthUseCase from "../useCases/authUseCase";

const authUseCase = new AuthUseCase();

export default class AuthController {
  async currentUser(req: any, res: Response) {
    const { currentUserId, currentUserRole } = req;
    const currentUser = await authUseCase.currentUser({
      id: currentUserId,
      role: currentUserRole,
    });
    return res.status(200).json(currentUser);
  }
}
