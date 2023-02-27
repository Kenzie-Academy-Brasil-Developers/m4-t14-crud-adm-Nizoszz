import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import {
  iUser,
  iUserPut,
  iUserWithoutPasswordResult,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { returnUserSchema } from "../../schemas/users.schemas";

const put = async (payload: iUserPut, userId: number): Promise<iUser> => {
  const tbCol: string[] = Object.keys(payload);
  const tbValue: (string | number | boolean | boolean)[] =
    Object.values(payload);
  const queryTemplate: string = `
        UPDATE
            users
        SET
            (%I) = ROW (%L)
        WHERE 
            id = $1
        RETURNING   *;
    `;

  const queryFomart = format(queryTemplate, tbCol, tbValue);

  const queryConfig: QueryConfig = {
    text: queryFomart,
    values: [userId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return returnUserSchema.parse(queryResult.rows[0]);
};

export default { put };
