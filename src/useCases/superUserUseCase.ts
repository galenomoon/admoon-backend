import { IUser } from "../interfaces/user";
import SuperUserModel from "../models/superUserModel";
import { AppError } from "../errors/appError";
import { comparePasswords, generateToken, hashPassword } from "../utils/auth";

const superUserModel = new SuperUserModel();

export default class SuperUserUseCase {
  async login({ email, password }: IUser) {
    const user = await superUserModel.getByEmail(email);
    if (!user) throw new AppError("User not found", 404);

    const passwordMatches = await comparePasswords(password, user.password);
    if (!passwordMatches) throw new AppError("Invalid password", 401);

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: "superuser",
    });
    return { token };
  }

  async register({ firstName, lastName, email, password }: IUser) {
    const userAlreadyExists = await superUserModel.getByEmail(email);
    if (userAlreadyExists) throw new AppError("User already exists", 409);

    if (!firstName) throw new AppError("First name is required");
    if (!lastName) throw new AppError("Last name is required");
    if (!email) throw new AppError("Email is required");
    if (!password) throw new AppError("Password is required");

    const hashedPassword = await hashPassword(password);
    const user = await superUserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  async delete(id: string) {
    if (!Number(id)) throw new AppError("Id is required");
    await superUserModel.delete(Number(id));
  }
}
