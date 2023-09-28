import { Router } from "express";
import SuperUserController from "../controllers/superUserController";

const superUserRoutes = Router();

const superUserController = new SuperUserController();

superUserRoutes.post("/login", superUserController.login)
superUserRoutes.post("/register", superUserController.register)

export default superUserRoutes;
