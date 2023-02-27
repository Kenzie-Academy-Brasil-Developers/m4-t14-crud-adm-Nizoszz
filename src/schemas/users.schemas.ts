import { hashSync } from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Must be at least 8 characters in length")
    .transform((pass) => {
      return hashSync(pass, 10);
    }),
  admin: z.boolean().optional().default(false),
});

const returnUserSchema = createUserSchema
  .extend({
    id: z.number(),
    active: z.boolean(),
  })
  .omit({ password: true });

const putSchema = returnUserSchema.pick({
  active: true,
});

const allUsersSchema = returnUserSchema.array();

const updateSchema = z.object({
  name: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
});

export {
  createUserSchema,
  returnUserSchema,
  allUsersSchema,
  updateSchema,
  putSchema,
};
