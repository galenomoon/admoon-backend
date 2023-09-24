import { Router } from "express";
import AuthController from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const userRoutes = Router();

const authController = new AuthController();

userRoutes.get("/current_user", authenticateToken, authController.currentUser)

export default userRoutes;
