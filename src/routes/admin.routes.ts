import { Router } from "express";
import AdminController from "../controllers/adminController";

const adminRoutes = Router();

const adminController = new AdminController();

//REST ROUTES
adminRoutes.get("/", adminController.getAll);
adminRoutes.put("/:id", adminController.update);
adminRoutes.delete("/:id", adminController.delete);

//CUSTOM ROUTES
adminRoutes.post("/login", adminController.login)
adminRoutes.post("/register", adminController.register)

export default adminRoutes;
