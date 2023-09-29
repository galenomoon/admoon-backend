import { Router } from "express";

//middlewares
import { authenticateToken } from "../middlewares/authMiddleware";

//controllers
import WebsiteController from "../controllers/websitesController";
import CategoryController from "../controllers/categoriesController";
import ProductController from "../controllers/productsController";

const websitesRoutes = Router();

const websiteController = new WebsiteController();
const productController = new ProductController();
const categoryController = new CategoryController();

//REST
websitesRoutes.get("/", authenticateToken, websiteController.getAll);
websitesRoutes.get("/:id", authenticateToken, websiteController.getById);
websitesRoutes.post("/", authenticateToken, websiteController.create);
websitesRoutes.put("/:id", authenticateToken, websiteController.update);
websitesRoutes.delete("/:id", authenticateToken, websiteController.delete);

//CUSTOM
websitesRoutes.post("/:id/services", authenticateToken, websiteController.handleServices);

// ------------------ WEBSITE CATEGORIES ROUTES ------------------

//REST
websitesRoutes.get("/:websiteId/categories/", categoryController.getAll);
websitesRoutes.get("/:websiteId/categories/:id", categoryController.getById);
websitesRoutes.post("/:websiteId/categories/", authenticateToken, categoryController.create);
websitesRoutes.put("/:websiteId/categories/:id", authenticateToken, categoryController.update);
websitesRoutes.delete("/:websiteId/categories/:id", authenticateToken, categoryController.delete);

// ------------------ WEBSITE PRODUCTS ROUTES ------------------

//REST
websitesRoutes.get("/:websiteId/products/", productController.getAll);
websitesRoutes.get("/:websiteId/products/:idOrSlug", productController.getByIdOrSlug);
websitesRoutes.post("/:websiteId/products/", authenticateToken, productController.create);
websitesRoutes.put("/:websiteId/products/:id", authenticateToken, productController.update);
websitesRoutes.delete("/:websiteId/products/:id", authenticateToken, productController.delete);

//CUSTOM 
websitesRoutes.get("/:websiteId/products/category/:categoryIdOrSlug", productController.getByCategory);

export default websitesRoutes;
