import User from "../entities/user";
import { AppDataSource } from "../../DataSource/datasource";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { jwtUserInterface } from "../types";
config();

export const verifyIfEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ email: req.validatedData.email });
  if (user?.email) {
    return res.status(401).json({ error: "Email already taken" });
  }
  next();
};

export const isLogged = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.userDataByToken = decoded as jwtUserInterface;
    return next();
  });
};

export const isAdm = (req: Request, res: Response, next: NextFunction) => {
  const user = req.userDataByToken;
  if (user.token_user.is_adm) {
    return next();
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
