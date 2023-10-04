import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().refine((value) => value.includes('@'), {
    message: 'Invalid email format',
  }),
  password: z.string().min(8, {
    message: 'hint: should be 8 characters long',
  }),
});

export type loginFormData = z.infer<typeof loginSchema>;
