import { z } from 'zod';

export const searchUserSchema = z.object({
  query: z.string(),
  page: z.number().int().positive(),
});
