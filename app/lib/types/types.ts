import { z } from 'zod';

export type Profile = {
    id: string;
    username: string;
    dareCoins: number;
    email?: string;
    isCamUser: boolean;
};

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
export const customerLoginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(7, 'Password must be at least 7 characters'),
});
export type TLoginSchema = z.infer<typeof customerLoginSchema>;

export const influencerSignUpSchema = z
    .object({
        email: z.string().email('Invalid email address'),
        name: z.string().min(4, 'Name must be at least 4 characters').max(20, 'Name must be less than 20 characters'),
        username: z.string().min(5, 'Username must be at least 5 characters').max(20, 'UserName must be less than 20 characters'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
        over18: z.boolean().refine((data) => data, { message: 'You must be over 18' }),
        termsAndConditions: z.boolean().refine((data) => data, { message: 'You must accept the terms and conditions' }),
        privacyPolicy: z.boolean().refine((data) => data, { message: 'You must accept the privacy policy' }),
    })
    .refine((data) => data.password === data.confirmPassword, { message: 'Passwords must match', path: ['confirmPassword'] });

export type ISignUpSchema = z.infer<typeof influencerSignUpSchema>;
