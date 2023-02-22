import { Request, Response } from "express";
import {
  userReadService,
  userCreateService,
  userDeleteService,
  usersReadService,
  userUpdateService,
} from "../services/users";
import { iUserRequest, iUserUpdate } from "../interfaces/users.interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const data: iUserRequest = req.body;

  const newUser = await userCreateService.create(data);
  return res.status(201).json(newUser);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const allUsers = await usersReadService.read();

  return res.json(allUsers);
};

const readProfile = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(req.user.id);
  const user = await userReadService.readProfile(userId);
  return res.status(200).json(user);
};

export const update = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  const data: iUserUpdate = req.body;

  const update = await userUpdateService.update(data, id);
  console.log(update);
  return resp.status(200).json(update);
};

const del = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(req.params.id);
  const userDelete = await userDeleteService.del(userId);
  return res.status(204).send();
};

export default { create, read, readProfile, update, del };
