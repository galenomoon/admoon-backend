import { IUser } from "../interfaces/user";
import UserModel from "../models/userModel";
import { AppError } from "../errors/appError";
import { comparePasswords, generateToken, hashPassword } from "../utils/auth";

const userModel = new UserModel();

export default class UserUseCase {
  async login({ email, password }: IUser) {
    const user = await userModel.getByEmail(email);
    if (!user) throw new AppError("User not found", 404);

    const passwordMatches = await comparePasswords(password, user.password);
    if (!passwordMatches) throw new AppError("Invalid password", 401);

    const token = generateToken({ id: user.id, email: user.email });
    return { token };
  }

  async register({ firstName, lastName, email, password }: IUser) {
    const userAlreadyExists = await userModel.getByEmail(email);
    if (userAlreadyExists) throw new AppError("User already exists", 409);

    if (!firstName) throw new AppError("First name is required");
    if (!lastName) throw new AppError("Last name is required");
    if (!email) throw new AppError("Email is required");
    if (!password) throw new AppError("Password is required");

    const hashedPassword = await hashPassword(password);
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = generateToken({ id: user.id, email: user.email });
    return { token };
  }

  async currentUser(id: number) {
    const user = await userModel.getById(id);
    if (!user) throw new AppError("User not found", 404);
    return user;
  }
}
