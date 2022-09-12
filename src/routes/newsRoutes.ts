import { Router } from "express";
import {
  deleteNews,
  getNews,
  getNewsById,
  patchNews,
  postNews,
} from "../controllers/newsController";
import News from "../entities/news";
import validateData from "../middlewares/schemaValidate";
import { isAdm, isLogged } from "../middlewares/usersMiddleware";
import { verifyIfIdExists } from "../middlewares/VerifyIfIdExists";
import newsSchema from "../schemas/newsSchema";

const newsRoutes = () => {
  const router = Router();
  router.post("", validateData(newsSchema), isLogged, isAdm, postNews);
  router.get("", getNews);
  router.get("/:id", verifyIfIdExists(News, "News not found"), getNewsById);
  router.delete(
    "/:id",
    verifyIfIdExists(News, "News not found"),
    isLogged,
    isAdm,
    deleteNews
  );
  router.patch("/:id", isLogged, isAdm, patchNews);
  return router;
};

export default newsRoutes;
