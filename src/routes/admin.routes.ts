import { Router } from "express";
import AdminController from "../controllers/adminController";
import { authenticateToken } from "../middlewares/authMiddleware";

const adminRoutes = Router();

const adminController = new AdminController();

//REST ROUTES
adminRoutes.get("/", adminController.getAll);
adminRoutes.put("/:id", adminController.update);

//CUSTOM ROUTES
adminRoutes.post("/login", adminController.login)
adminRoutes.post("/register", adminController.register)

export default adminRoutes;
