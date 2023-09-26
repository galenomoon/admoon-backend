import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import WebsiteController from "../controllers/websitesController";

const websitesRoutes = Router();

const websiteController = new WebsiteController();

websitesRoutes.get("/", authenticateToken, websiteController.getAll);
websitesRoutes.get("/:id", authenticateToken, websiteController.getById);
websitesRoutes.post("/", authenticateToken, websiteController.create);
websitesRoutes.put("/:id", authenticateToken, websiteController.update);
websitesRoutes.delete("/:id", authenticateToken, websiteController.delete);

export default websitesRoutes;
