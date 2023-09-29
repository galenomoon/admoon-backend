import { Router } from "express";
import authRoutes from "./auth.routes";
import adminRoutes from "./admins.routes";
import imagesRoutes from "./images.routes";
import websitesRoutes from "./websites.routes";
import servicesRoutes from "./services.routes";
import superUserRoutes from "./superUsers.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/services", servicesRoutes);
routes.use("/websites", websitesRoutes);
routes.use("/admins", adminRoutes);
routes.use("/superusers", superUserRoutes);
routes.use("/images", imagesRoutes);

routes.get("/", (_, res) => res.status(200).json({ message: "OK!" }));

export default routes;
