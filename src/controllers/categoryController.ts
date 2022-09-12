import { Response, Request } from "express";
import {
  getAllCategorys,
  getOrCreateCategory,
  removeCategory,
  updateCategory,
} from "../services/categoryServices";
import { categoryInterface } from "../types";

export const postCategory = async (req: Request, res: Response) => {
  const categoryData = req.validatedData as categoryInterface;
  const category = await getOrCreateCategory(categoryData.name);
  res.status(201).json(category);
};

export const getCategorys = async (req: Request, res: Response) => {
  const categories = await getAllCategorys();
  res.json(categories);
};

export const patchCategory = async (req: Request, res: Response) => {
  const category: string | any = await updateCategory(
    req.body.name,
    req.params.id
  );

  if (category.detail) {
    return res.status(409).json({ error: "Category exists" });
  }
  return res.status(202).json({ name: category });
};

export const deleteCategory = async (req: Request, res: Response) => {
  await removeCategory(req.params.id);
  res.sendStatus(204);
};
