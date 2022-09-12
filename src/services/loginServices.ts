import { AppDataSource } from "../../DataSource/datasource";
import User from "../entities/user";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const getUserByEmail = async (email: string) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneOrFail({
    where: { email: email },
    select: [
      "id",
      "name",
      "email",
      "is_adm",
      "password",
      "updated_at",
      "created_at",
    ],
  });
  return user;
};

export const validatePassword = (password: string, hashedPassword: string) => {
  return compareSync(password, hashedPassword);
};

export const generateToken = (user: any) => {
  const token_user = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_adm: user.is_adm,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
  const token = jwt.sign({ token_user }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.EXPIRES_IN,
  });
  return token;
};
