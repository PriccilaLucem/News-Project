import { AppDataSource } from "../../DataSource/datasource";
import User from "../entities/user";
import { userInterface } from "../types";

export const createUser = async (userData: userInterface) => {
  const userRepo = AppDataSource.getRepository(User);

  const user = new User();
  user.email = userData.email;
  user.name = userData.name;
  user.password = userData.password;
  user.is_adm = userData.is_adm as boolean;

  await userRepo.save(user);
  return user;
};

export const getAllUsers = async () => {
  const userRepo = AppDataSource.getRepository(User);
  const AllUsers = await userRepo.find();
  return AllUsers;
};

export const getSpecificUser = async (id: string) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: id });
  return user;
};

export const deleteUserById = async (id: string) => {
  const userRepo = AppDataSource.getRepository(User);
  await userRepo.delete({ id: id });
};

export const updateUser = async (id: string, data: any) => {
  const patchData = {
    name: data.name,
    email: data.email,
    updated_at: new Date(),
  };
  try {
    await AppDataSource.getRepository(User).update({ id: id }, patchData);
    return patchData;
  } catch (e) {
    return e;
  }
};
