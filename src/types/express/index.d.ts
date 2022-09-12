import { jwtUserDataInterface } from "..";

declare global {
  namespace Express {
    interface Request {
      validatedData?: any;
      userDataByToken?: jwtUserDataInterface;
    }
  }
}
