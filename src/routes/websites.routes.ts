import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import WebsiteController from "../controllers/websitesController";

const websitesRoutes = Router();

const websiteController = new WebsiteController();

//REST ROUTES
websitesRoutes.get("/", authenticateToken, websiteController.getAll);
websitesRoutes.get("/:id", authenticateToken, websiteController.getById);
websitesRoutes.post("/", authenticateToken, websiteController.create);
websitesRoutes.put("/:id", authenticateToken, websiteController.update);
websitesRoutes.delete("/:id", authenticateToken, websiteController.delete);

//CUSTOM ROUTES
websitesRoutes.post("/:id/services", authenticateToken, websiteController.handleServices);

export default websitesRoutes;
