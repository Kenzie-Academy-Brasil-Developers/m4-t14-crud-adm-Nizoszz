import { Router } from "express";
import { loginController } from "../controllers";
import validateBody from "../middlewares/validatedBody.middleware";
import { createLoginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  validateBody.verify(createLoginSchema),
  loginController.create
);

export default loginRoutes;
