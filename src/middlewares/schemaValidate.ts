import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

const validateData =
  (schema: yup.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      const validatedData = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: true,
      });
      req.validatedData = validatedData as any;
      return next();
    } catch (e: any) {
      return res.status(400).json({ error: e });
    }
  };

export default validateData;
