import { compare } from "bcryptjs";
import { iUserWithoutPasswordResult } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../errors";
import { iLoginRequest } from "../../interfaces/login.interfaces";
import format from "pg-format";
import jwt from "jsonwebtoken";
const create = async (data: iLoginRequest): Promise<string> => {
  const queryUserTemplate: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = (%L);
    `;

  const queryUserFormat = format(queryUserTemplate, [data.email]);
  const queryUserResult: iUserWithoutPasswordResult = await client.query(
    queryUserFormat
  );

  if (queryUserResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const verifyPassword: boolean = await compare(
    data.password,
    queryUserResult.rows[0].password
  );

  if (!verifyPassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    { admin: queryUserResult.rows[0].admin },
    process.env.SECRETE_KEY!,
    {
      expiresIn: "24h",
      subject: queryUserResult.rows[0].id.toString(),
    }
  );

  return token;
};

export default { create };
