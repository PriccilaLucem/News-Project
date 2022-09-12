import { AppDataSource } from "../../DataSource/datasource";
import Category from "../entities/category";

export const getAllCategorys = async () => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const categories = await categoryRepo.find();
  return categories;
};

export const removeCategory = async (id: string) => {
  const categoryRepo = AppDataSource.getRepository(Category);
  await categoryRepo.delete({ id: id });
};

export const getOrCreateCategory = async (categoryName: string) => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const category = await categoryRepo.findOneBy({ name: categoryName });

  if (!category) {
    const newCategory = new Category();
    newCategory.name = categoryName;
    await categoryRepo.save(newCategory);
    return newCategory;
  }

  return category;
};

export const updateCategory = async (
  newName: string,
  id: string
): Promise<string | unknown> => {
  const categoryRepo = AppDataSource.getRepository(Category);
  try {
    await categoryRepo.update(id, { name: newName });
    return newName;
  } catch (e) {
    return e;
  }
};
