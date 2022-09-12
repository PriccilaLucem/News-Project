import { AppDataSource } from "../../DataSource/datasource";
import News from "../entities/news";
import { getOrCreateCategory } from "./categoryServices";
import { getSpecificUser } from "./userServices";

export const createNews = async (userId: string, newsData: any) => {
  const user = await getSpecificUser(userId);
  const category = await getOrCreateCategory(newsData.category);
  const newsRepo = AppDataSource.getRepository(News);
  if (user) {
    const news = new News();
    news.name = newsData.name;
    news.category = category;
    news.writer = user;
    news.text = newsData.text;

    await newsRepo.save(news);
    return news;
  }
};

export const getAllNews = async () => {
  const news = await AppDataSource.getRepository(News).find({
    relations: ["writer", "category"],
  });
  return news;
};

export const getOneNews = async (id: string) => {
  const newsRepo = AppDataSource.getRepository(News);
  const news = newsRepo.findOne({
    where: { id: id },
    relations: ["writer", "category"],
  });
  return news;
};

export const deleteNewsById = async (id: string) => {
  AppDataSource.getRepository(News).delete({ id: id });
};

export const patchNewsById = async (id: string, data: any) => {
  const patchData = {
    name: data.name,
    text: data.text,
    category: data.category,
  };
  if (data.category) {
    const category = await getOrCreateCategory(data.category);
    patchData.category = category;
  }
  await AppDataSource.getRepository(News).update(id, patchData);
  return patchData;
};
