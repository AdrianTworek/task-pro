import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(4, 'Name must have at least 4 characters'),
  description: z
    .string()
    .min(12, 'Description must have at least 12 characters'),
  members: z.array(z.string()).optional(),
});

export type CreateProjectBody = z.infer<typeof createProjectSchema>;
