import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().max(50),
  password: z.string().min(6),
});

export type UserSchemaType = z.infer<typeof userSchema>;
