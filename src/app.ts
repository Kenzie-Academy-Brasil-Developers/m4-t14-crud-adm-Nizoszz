import "express-async-errors";
import express, { Application } from "express";
import { userRoutes, loginRoutes } from "./routers";
import { handleErrors } from "./errors";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.use(handleErrors);

export default app;
