import { Router } from "express";
import UserController from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/current_user", authenticateToken, userController.currentUser)
userRoutes.post("/login", userController.login)
userRoutes.post("/register", userController.register)

export default userRoutes;
