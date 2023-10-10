import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().refine((value) => value.includes('@'), {
    message: 'Invalid email format',
  }),
  password: z.string().min(8, {
    message: 'hint: should be 8 characters long',
  }),
});
export const registerSchema = z.object({
  name: z.string().min(2, {
    message: 'Please enter valid name.',
  }),
  email: z.string().refine((value) => value.includes('@'), {
    message: 'Invalid email format',
  }),
  password: z.string().min(8, {
    message: 'hint: should be 8 characters long',
  }),
});

export const verificationCodeSchema = z.object({
  verificationCode: z.string().refine(
    (code) => {
      return /^\d{6}$/.test(code);
    },
    {
      message: 'Code must be a 6-digit number',
    },
  ),
});
export type loginFormData = z.infer<typeof loginSchema>;
export type registerFormData = z.infer<typeof registerSchema>;
export type verificationFormData = z.infer<typeof verificationCodeSchema>;
