import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import {
  iUserUpdate,
  iUserWithoutPassword,
  iUserResult,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

const update = async (
  payload: iUserUpdate,
  userId: number
): Promise<iUserWithoutPassword> => {
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
    text: queryFomart,
    values: [userId],
  };

  const queryResult: iUserResult = await client.query(queryConfig);

  return returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);
};

export default { update };
