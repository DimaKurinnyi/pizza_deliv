import { z } from 'zod';

export const passwordSchema = z.string().min(6, 'Password must be at least 6 characters long');

export const FormLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
});
export const FormRegisterSchema = FormLoginSchema.merge(
  z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters long'),
    confirmPassword: passwordSchema,
  }),
).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type TLoginFormValues = z.infer<typeof FormLoginSchema>;
export type TRegisterFormValues = z.infer<typeof FormRegisterSchema>;