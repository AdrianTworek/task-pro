import { z } from 'zod';

export const registerWithCredentialsSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email address is required')
      .email('Please provide a valid email address')
      .max(254, 'Email cannot contain more than 254 characters')
      .transform((value) => value.toLowerCase()),
    password: z
      .string()
      .min(6, 'Password must contain at least 6 characters')
      .max(254, 'Password cannot contain more than 254 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterWithCredentialsBody = z.infer<
  typeof registerWithCredentialsSchema
>;
