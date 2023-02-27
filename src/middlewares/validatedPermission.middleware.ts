import { Request, Response, NextFunction } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { AppError } from "../errors";

const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = Number(req.params.id);
  const admin: boolean = req.user.admin;
  const { id } = req.user;

  if (admin === false) {
    const queryUserTemplate: string = `
          SELECT
            *
          FROM
            users
          WHERE
            id = (%L)
        `;
    const queryUserFormat: string = format(queryUserTemplate, [id]);
    const queryUserResult: QueryResult = await client.query(queryUserFormat);
    const userVerify = queryUserResult.rows[0];

    if (userId !== id) {
      throw new AppError("Insufficient Permission", 403);
    }
  }

  return next();
};

export default { verify };
