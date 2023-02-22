import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import {
  iUserResult,
  iUserRequest,
  iUser,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { returnUserSchema } from "../../schemas/users.schemas";

const put = async (payload: iUserRequest, userId: number): Promise<iUser> => {
  const newPayload: iUser = {
    id: userId,
    active: true,
    ...payload,
  };
  const tbCol: string[] = Object.keys(newPayload);
  const tbValue: (string | number | boolean)[] = Object.values(newPayload);
  const queryTemplate: string = `
        UPDATE
            users
        SET
            (%I) = ROW (%L)
        WHERE 
            id = $1
        RETURNING   *;
    `;

  console.log(newPayload);
  const queryFomart = format(queryTemplate, tbCol, tbValue);

  const queryConfig: QueryConfig = {
    text: queryFomart,
    values: [userId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return returnUserSchema.parse(queryResult.rows[0]);
};

export default { put };
