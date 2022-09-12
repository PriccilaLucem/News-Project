import { Router } from "express";
import {
  deleteCategory,
  getCategorys,
  patchCategory,
  postCategory,
} from "../controllers/categoryController";
import Category from "../entities/category";
import validateData from "../middlewares/schemaValidate";
import { isAdm, isLogged } from "../middlewares/usersMiddleware";
import { verifyIfIdExists } from "../middlewares/VerifyIfIdExists";
import categorySchema from "../schemas/category";

const categoryRoutes = () => {
  const router = Router();
  router.post("", validateData(categorySchema), postCategory);
  router.get("", getCategorys);
  router.patch(
    "/:id",
    isLogged,
    isAdm,
    verifyIfIdExists(Category, "Category not found"),
    patchCategory
  );
  router.delete(
    "/:id",
    isLogged,
    isAdm,
    verifyIfIdExists(Category, "Category not found"),
    deleteCategory
  );

  return router;
};

export default categoryRoutes;
