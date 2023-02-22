import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const verify = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | void> => {
  const autentication = req.user.admin;

  if (autentication === false) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default { verify };
