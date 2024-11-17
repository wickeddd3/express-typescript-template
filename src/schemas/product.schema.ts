import { z } from "zod";

export const productSchema = z.object({
  slug: z.string(),
  name: z.string().max(100),
  brand: z.string().max(100).optional(),
  supplier: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  serialNumber: z.string().max(100).optional(),
  barcode: z.string().max(100).optional(),
  price: z.number().min(0).optional(),
  categoryId: z.number(),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
