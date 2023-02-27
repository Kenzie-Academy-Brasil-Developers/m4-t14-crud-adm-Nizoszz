import {
  iUserWithoutPassword,
  iUserRequest,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { QueryResult } from "pg";
import { AppError } from "../../errors";
import { returnUserSchema } from "../../schemas/users.schemas";

const create = async (data: iUserRequest): Promise<iUserWithoutPassword> => {
  const queryUserTemplate: string = `
    SELECT
      *
    FROM
      users
    WHERE
      email = (%L)
  `;
  const queryUserFormat: string = format(queryUserTemplate, [data.email]);
  const queryUserResult: QueryResult = await client.query(queryUserFormat);

  if (queryUserResult.rowCount > 0) {
    throw new AppError("E-mail already registered!");
  }

  const tbCol: string[] = Object.keys(data);
  const tbValues: (string | boolean)[] = Object.values(data);
  const queryTemplate: string = `
    INSERT INTO
      users(%I)
    VALUES
      (%L)
    RETURNING *;
    `;

  const queryFormat: string = format(queryTemplate, tbCol, tbValues);
  const queryResult: QueryResult = await client.query(queryFormat);

  const user = returnUserSchema.parse(queryResult.rows[0]);

  return user;
};

export default { create };
