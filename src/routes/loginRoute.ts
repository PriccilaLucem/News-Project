import { Router } from "express";
import { login } from "../controllers/loginController";
import validateData from "../middlewares/schemaValidate";
import loginSchema from "../schemas/loginSchema";

const loginRoute = () => {
  const router = Router();
  router.post("", validateData(loginSchema), login);
  return router;
};

export default loginRoute;
