import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../DataSource/datasource";
import validator from "validator";

export const verifyIfIdExists =
  (Entity: any, error: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const userRepo = AppDataSource.getRepository(Entity);
    if (!validator.isUUID(id)) {
      return res.status(404).json({ error: error });
    }
    const user = await userRepo.findOneBy({ id: id });

    if (!user?.id) {
      return res.status(404).json({ error: error });
    }
    next();
  };
