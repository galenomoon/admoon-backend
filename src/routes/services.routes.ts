import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import ServiceController from "../controllers/servicesController";

const servicesRoutes = Router();

const serviceController = new ServiceController();

servicesRoutes.get("/", authenticateToken, serviceController.getAll);
servicesRoutes.get("/:id", authenticateToken, serviceController.getById);
servicesRoutes.post("/", authenticateToken, serviceController.create);
servicesRoutes.put("/:id", authenticateToken, serviceController.update);
servicesRoutes.delete("/:id", authenticateToken, serviceController.delete);

export default servicesRoutes;
