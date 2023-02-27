import { Router } from "express";
import usersControllers from "../controllers/users.controllers";
import {
  ensureExistUser,
  validateBody,
  ensureTokenIsValid,
  ensureAdminIsValid,
  validatePermission,
} from "../middlewares";
import {
  createUserSchema,
  putSchema,
  updateSchema,
} from "../schemas/users.schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  validateBody.verify(createUserSchema),
  usersControllers.create
);
userRoutes.get(
  "",
  ensureTokenIsValid.verify,
  ensureAdminIsValid.verify,
  usersControllers.read
);
userRoutes.get(
  "/profile",
  ensureTokenIsValid.verify,
  ensureExistUser.verify,
  usersControllers.readProfile
);

userRoutes.patch(
  "/:id",
  ensureTokenIsValid.verify,
  ensureExistUser.verify,
  validatePermission.verify,
  validateBody.verify(updateSchema),
  usersControllers.update
);
userRoutes.put(
  "/:id/recover",
  ensureTokenIsValid.verify,
  ensureExistUser.verify,
  ensureAdminIsValid.verify,
  validateBody.verify(putSchema),
  usersControllers.put
);
userRoutes.delete(
  "/:id",
  ensureTokenIsValid.verify,
  ensureExistUser.verify,
  validatePermission.verify,
  usersControllers.del
);

export default userRoutes;
