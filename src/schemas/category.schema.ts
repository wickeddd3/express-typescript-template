import { z } from "zod";

export const categorySchema = z.object({
  name: z.string(),
  description: z.string().max(200).optional(),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
