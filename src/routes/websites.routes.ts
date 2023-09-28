import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import WebsiteController from "../controllers/websitesController";
import CategoryController from "../controllers/categoriesController";

const websitesRoutes = Router();

const websiteController = new WebsiteController();
const categoryController = new CategoryController();

//REST ROUTES
websitesRoutes.get("/", authenticateToken, websiteController.getAll);
websitesRoutes.get("/:id", authenticateToken, websiteController.getById);
websitesRoutes.post("/", authenticateToken, websiteController.create);
websitesRoutes.put("/:id", authenticateToken, websiteController.update);
websitesRoutes.delete("/:id", authenticateToken, websiteController.delete);

//CUSTOM ROUTES
websitesRoutes.post("/:id/services", authenticateToken, websiteController.handleServices);

//CATEGORIES ROUTES
websitesRoutes.get("/:websiteId/categories/", categoryController.getAll);
websitesRoutes.get("/:websiteId/categories/:id", categoryController.getById);
websitesRoutes.post("/:websiteId/categories/", authenticateToken, categoryController.create);
websitesRoutes.put("/:websiteId/categories/:id", authenticateToken, categoryController.update);
websitesRoutes.delete("/:websiteId/categories/:id", authenticateToken, categoryController.delete);

export default websitesRoutes;
