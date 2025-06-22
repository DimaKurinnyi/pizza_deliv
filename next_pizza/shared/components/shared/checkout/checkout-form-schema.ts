import { z } from 'zod';
export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(9, { message: 'Phone number is required' }),
  address: z.string().min(5, { message: 'Address is required' }),
  comment: z.string(),
});

export type TCheckoutFormValues = z.infer<typeof checkoutFormSchema>;
