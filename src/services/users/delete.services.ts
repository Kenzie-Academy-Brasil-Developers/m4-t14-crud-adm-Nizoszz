import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";

const del = async (userId: number): Promise<void> => {
  const queryDesactiveTemplate: string = `
    UPDATE
        users
    SET
        active = false
    WHERE
        id = (%L);
  `;

  const queryDesactiveFormat: string = format(queryDesactiveTemplate, [userId]);
  const queryDesactiveResult: QueryResult = await client.query(
    queryDesactiveFormat
  );
};

export default { del };
