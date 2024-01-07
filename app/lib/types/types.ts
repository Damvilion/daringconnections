import { z } from 'zod';

export const customerSignUpSchema = z
    .object({
        email: z.string().email('Invalid email address'),
        username: z.string().min(5, 'Username must be at least 5 characters'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
        over18: z.boolean().refine((data) => data, { message: 'You must be over 18' }),
        termsAndConditions: z.boolean().refine((data) => data, { message: 'You must accept the terms and conditions' }),
        privacyPolicy: z.boolean().refine((data) => data, { message: 'You must accept the privacy policy' }),
    })
    .refine((data) => data.password === data.confirmPassword, { message: 'Passwords must match', path: ['confirmPassword'] });

export type TSignUpSchema = z.infer<typeof customerSignUpSchema>;

// Customer Login
export const customerLoginSchema = z.object({ email: z.string().email('Invalid email address'), password: z.string().min(7) });
export type TLoginSchema = z.infer<typeof customerLoginSchema>;
