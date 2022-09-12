import { Request, Response } from "express";
import {
  createNews,
  deleteNewsById,
  getAllNews,
  getOneNews,
  patchNewsById,
} from "../services/newsServices";

export const postNews = async (req: Request, res: Response) => {
  const user = req.userDataByToken;
  const data = req.body;
  const news = await createNews(user.id, data);
  return res.status(201).json(news);
};

export const getNews = async (req: Request, res: Response) => {
  const news = await getAllNews();
  return res.json(news);
};

export const getNewsById = async (req: Request, res: Response) => {
  const news = await getOneNews(req.params.id);
  return res.json(news);
};

export const deleteNews = async (req: Request, res: Response) => {
  deleteNewsById(req.params.id);
  return res.sendStatus(204);
};

export const patchNews = async (req: Request, res: Response) => {
  const updatedData = await patchNewsById(req.params.id, req.body);
  return res.status(202).json(updatedData);
};
