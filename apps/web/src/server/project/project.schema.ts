import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(4, 'Name must have at least 4 characters'),
  description: z
    .string()
    .min(12, 'Description must have at least 12 characters'),
  members: z.array(z.string()).optional(),
});

export const updateProjectInformationSchema = z.object({
  id: z.string(),
  name: z.string().min(4, 'Name must have at least 4 characters'),
  description: z
    .string()
    .min(12, 'Description must have at least 12 characters'),
});

export type CreateProjectBody = z.infer<typeof createProjectSchema>;
export type UpdateProjectBody = z.infer<typeof updateProjectInformationSchema>;
