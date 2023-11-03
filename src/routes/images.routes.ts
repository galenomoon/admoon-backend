import multer from "multer";
import { Router } from "express";
import ImagesController from "../controllers/imagesController";

const imagesRoutes = Router();
const upload = multer();
const imagesController = new ImagesController();

//REST
imagesRoutes.get("/", imagesController.getAll);
imagesRoutes.get("/:id", imagesController.getById);
imagesRoutes.post("/:productId", upload.array('images', 22), imagesController.create);
imagesRoutes.delete("/:id", imagesController.delete);

// CUSTOM ROUTES
imagesRoutes.get("/product/:productId", imagesController.getByProductId);
imagesRoutes.get("/product/slug/:productSlug", imagesController.getByProductSlug);
imagesRoutes.post("/shuffle/:productId", upload.array('images', 22), imagesController.shuffleImages);

export default imagesRoutes;
