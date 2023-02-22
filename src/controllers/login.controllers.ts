import { Request, Response } from "express";
import { loginCreateService } from "../services/login";

const create = async (req: Request, res: Response): Promise<Response> => {
  const token = await loginCreateService.create(req.body);

  return res.json({ token: token });
};

export default { create };
