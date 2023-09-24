import { AppError } from "../errors/appError";
import AdminModel from "../models/adminModel";
import SuperUserModel from "../models/superUserModel";

const superUserModel = new SuperUserModel();
const adminModel = new AdminModel();

export default class AuthUseCase {
  async currentUser({ id, role }: { id: number; role: "superuser" | "admin" }) {
    const model = role === "superuser" ? superUserModel : adminModel;

    const user = await model.getById(id);
    if (!user) throw new AppError(`${role} not found`, 404);
    return { ...user, role };
  }
}
