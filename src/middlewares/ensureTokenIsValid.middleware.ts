import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";

const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;
  if (!token) {
    throw new AppError("Missing Bearer Token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRETE_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    console.log(decoded);

    req.user = {
      id: Number(decoded.sub),
      admin: decoded.admin,
    };
    return next();
  });
};

export default { verify };
