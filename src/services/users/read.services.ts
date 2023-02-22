import { Request, Response } from "express";
import { QueryResult } from "pg";
import { iAllUsers } from "../../interfaces/users.interfaces";
import client from "../../database/connection";

const read = async (): Promise<iAllUsers> => {
  const queryTemplate = `
        SELECT
            *
        FROM
            users;
    `;

  const queryResult: QueryResult = await client.query(queryTemplate);
  const users = queryResult.rows;

  return users;
};

export default { read };
