import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  patchUser,
  postUser,
} from "../controllers/userControllers";
import User from "../entities/user";
import validateData from "../middlewares/schemaValidate";
import {
  isAdm,
  isLogged,
  verifyIfEmailExists,
} from "../middlewares/usersMiddleware";
import { verifyIfIdExists } from "../middlewares/VerifyIfIdExists";
import userSchema from "../schemas/userSchema";

const userRoutes = () => {
  const router = Router();

  router.post("", validateData(userSchema), verifyIfEmailExists, postUser);
  router.get("", isLogged, isAdm, getUsers);
  router.get(
    "/:id",
    isLogged,
    isAdm,
    verifyIfIdExists(User, "User not found"),
    getUser
  );
  router.delete(
    "/:id",
    isLogged,
    isAdm,
    verifyIfIdExists(User, "User not found"),
    deleteUser
  );
  router.patch("/:id", isLogged, patchUser);
  return router;
};

export default userRoutes;
