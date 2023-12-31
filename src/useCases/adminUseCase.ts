import { IUser } from "../interfaces/user";
import AdminModel from "../models/adminModel";
import { AppError } from "../errors/appError";
import { comparePasswords, generateToken, hashPassword } from "../utils/auth";

const adminModel = new AdminModel();

export default class UserUseCase {
  async getAll() {
    const admins = await adminModel.getAll();
    return admins;
  }

  async login({ email, password }: IUser) {
    const user = await adminModel.getByEmail(email);
    if (!user) throw new AppError("User not found", 404);

    const passwordMatches = await comparePasswords(password, user.password);
    if (!passwordMatches) throw new AppError("Invalid password", 401);

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: "admin",
    });
    return { token };
  }

  async register({ firstName, lastName, email, password }: IUser) {
    const userAlreadyExists = await adminModel.getByEmail(email);
    if (userAlreadyExists) throw new AppError("User already exists", 409);

    if (!firstName) throw new AppError("First name is required");
    if (!lastName) throw new AppError("Last name is required");
    if (!email) throw new AppError("Email is required");
    if (!password) throw new AppError("Password is required");

    const hashedPassword = await hashPassword(password);
    const user = await adminModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = generateToken({ id: user.id, email: user.email });
    return { token };
  }

  async update({ id, firstName, lastName, password }: IUser) {
    if (!id) throw new AppError("User id is required");
    if (!firstName) throw new AppError("First name is required");
    if (!lastName) throw new AppError("Last name is required");
    if (!password) throw new AppError("Password is required");

    const hashedPassword = await hashPassword(password);
    const user = await adminModel.update({
      id,
      firstName,
      lastName,
      password: hashedPassword,
    } as IUser);
    return user;
  }

  async delete(id: number) {
    if (!id) throw new AppError("User id is required");
    return await adminModel.delete(id);
  }
}
