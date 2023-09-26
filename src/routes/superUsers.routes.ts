import { Router } from "express";
import SuperUserController from "../controllers/superUserController";
import { authenticateToken } from "../middlewares/authMiddleware";

const superUserRoutes = Router();

const superUserController = new SuperUserController();

superUserRoutes.get("/current_user", authenticateToken, superUserController.currentUser)
superUserRoutes.post("/login", superUserController.login)
superUserRoutes.post("/register", superUserController.register)

export default superUserRoutes;
