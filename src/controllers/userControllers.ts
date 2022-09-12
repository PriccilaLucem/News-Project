import { Request, Response } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getSpecificUser,
  updateUser,
} from "../services/userServices";
import { userInterface } from "../types";

export const postUser = async (req: Request, res: Response) => {
  const userData = req.validatedData;
  const createdUser = await createUser(userData as userInterface);
  return res.status(201).json(createdUser);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await getSpecificUser(req.params.id);
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  await deleteUserById(req.params.id);
  res.sendStatus(204);
};

export const patchUser = async (req: Request, res: Response) => {
  const user: any = await updateUser(req.params.id, req.body);
  if (user.driverError) {
    return res.status(409).json({ error: "Email has already taken" });
  }
  return res.status(202).json(user);
};
