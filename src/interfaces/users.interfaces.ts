import { QueryResult } from "pg";
import { z } from "zod";
import {
  createUserSchema,
  returnUserSchema,
  allUsersSchema,
  updateSchema,
} from "../schemas/users.schemas";

type iUserRequest = z.infer<typeof createUserSchema>;
type iUser = z.infer<typeof returnUserSchema>;

type iUserWithoutPassword = Omit<iUser, "password">;
type iUserWithoutPasswordResult = QueryResult<iUser>;
type iUserResult = QueryResult<iUserWithoutPassword>;
type iAllUsers = z.infer<typeof allUsersSchema>;
type iUserUpdate = z.infer<typeof updateSchema>;

export {
  iUser,
  iUserRequest,
  iUserResult,
  iUserWithoutPassword,
  iAllUsers,
  iUserWithoutPasswordResult,
  iUserUpdate,
};
