import { QueryConfig } from "pg";
import {
  iUser,
  iUserResult,
  iUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";

const readProfile = async (userId: number): Promise<iUserWithoutPassword> => {
  const queryTemplate: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [userId],
  };

  const queryResult: iUserResult = await client.query(queryConfig);

  const user = queryResult.rows[0];

  return user;
};

export default { readProfile };
