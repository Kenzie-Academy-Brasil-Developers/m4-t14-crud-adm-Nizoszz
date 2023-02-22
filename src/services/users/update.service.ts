import { QueryConfig } from "pg";
import format from "pg-format";
import {
  iUserUpdate,
  iUserWithoutPassword,
  iUserResult,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../errors";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

export const update = async (
  payload: iUserUpdate,
  userId: number,
  admin: boolean
): Promise<iUserWithoutPassword> => {
  if (admin === false) {
    throw new AppError("Insufficient Permission", 403);
  }

  const tbCol: string[] = Object.keys(payload);
  const tbValue: (string | undefined)[] = Object.values(payload);
  const queryTemplate: string = `
        UPDATE
            users
        SET
            (%I) = ROW (%L)
        WHERE 
            id = $1
        RETURNING*;
    `;
  const queryFomart = format(queryTemplate, tbCol, tbValue);

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [userId],
  };

  const queryResult: iUserResult = await client.query(queryConfig);

  return returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);
};

export default { update };
