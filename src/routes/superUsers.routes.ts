import { Router } from "express";
import SuperUserController from "../controllers/superUserController";

const superUserRoutes = Router();

const superUserController = new SuperUserController();

superUserRoutes.get("/", superUserController.getAll)
superUserRoutes.post("/login", superUserController.login)
superUserRoutes.post("/register", superUserController.register)
superUserRoutes.delete("/:id", superUserController.delete)

export default superUserRoutes;
