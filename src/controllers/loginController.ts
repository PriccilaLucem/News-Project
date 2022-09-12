import { Response, Request } from "express";
import {
  generateToken,
  getUserByEmail,
  validatePassword,
} from "../services/loginServices";
import { loginInterface } from "../types";

export const login = async (req: Request, res: Response) => {
  const login = req.validatedData as loginInterface;

  const user = await getUserByEmail(login.email);
  if (validatePassword(login.password, user.password)) {
    const token = generateToken(user);
    return res.json({ token: token });
  }
  return res.status(409).json({ error: "Invalid password" });
};
