import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database";
import format from "pg-format";
import { AppError } from "../errors";
import { iUserResult } from "../interfaces/users.interfaces";

const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = Number(req.params.id);

  const queryUserTemplate: string = `
    SELECT
        *
    FROM
        users
    WHERE
        id = (%L)
`;

  const queryUserFormat: string = format(queryUserTemplate, [userId]);
  const queryResult: iUserResult = await client.query(queryUserFormat);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default { verify };
