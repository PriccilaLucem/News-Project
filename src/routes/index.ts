import userRoutes from "./userRoutes";
import { Application } from "express";
import categoryRoutes from "./categoryRoute";
import loginRoute from "./loginRoute";
import newsRoutes from "./newsRoutes";

const initApp = (app: Application) => {
  app.use("/user", userRoutes());
  app.use("/category", categoryRoutes());
  app.use("/login", loginRoute());
  app.use("/news", newsRoutes());
  return app;
};

export default initApp;
