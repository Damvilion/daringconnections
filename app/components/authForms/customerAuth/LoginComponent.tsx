'use client';
import React, { useState } from 'react';
import { Button as ShadButton } from '@/app/components/shadCn/ui/button';
import Link from 'next/link';
import { Separator } from '@/app/components/shadCn/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TLoginSchema, customerLoginSchema } from '@/app/lib/types/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuth } from '@/app/firebase/firebase-config';

const LoginComponent = () => {
    interface FirebaseErrors {
        code: string;
        message: string;
    }
    type LoginErrorType = 'Problem with email or password' | '';

    const [loginError, setLoginError] = useState<LoginErrorType>('');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TLoginSchema>({
        resolver: zodResolver(customerLoginSchema),
    });

    const onSubmit = async (data: TLoginSchema) => {
        try {
            const res = await signInWithEmailAndPassword(FirebaseAuth, data.email, data.password);
            console.log(res.user);
        } catch (error) {
            if ((error as FirebaseErrors).message === 'Firebase: Error (auth/invalid-credential).') {
                setLoginError('Problem with email or password');
            }
            console.log((error as FirebaseErrors).message);
        }
        console.log(data);
        reset();
    };

    return (
        <div className='flex flex-col border-slate-900 border-solid border rounded-md shadow-md p-3 sm:p-4 md:p-7 lg:p-10'>
            <h1 className='font-bold text-purple-800 text-medium md:text-xl my-2'>Member Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-start'>
                {/* USERNAME */}
                <div className='flex flex-col sm:flex-row gap-1 items-center w-full'>
                    <label className='text-xs md:text-base lg:text-lg' htmlFor='email'>
                        Email
                    </label>

                    <div className='flex flex-col sm:ml-auto'>
                        <input
                            {...register('email', {
                                onChange: () => setLoginError(''),
                            })}
                            className='text-sm md:text-base border-solid border border-black p-2 md:p-3 rounded-md'
                            type='text'
                            id='email'
                            autoComplete='email'
                        />
                        {errors.email && <span className='text-xs text-red-500'>{errors.email.message}</span>}
                    </div>
                </div>

                {/* PASSWORD */}
                <div className='flex flex-col sm:flex-row gap-1 items-center w-full'>
                    <label className='text-xs md:text-base lg:text-lg' htmlFor='password'>
                        Password
                    </label>
                    <div className='flex flex-col sm:ml-auto'>
                        <input
                            {...register('password', {
                                onChange: () => setLoginError(''),
                            })}
                            className='text-sm md:text-base border-solid border border-black p-2 md:p-3 rounded-md'
                            type='password'
                            id='password'
                        />
                        {loginError === 'Problem with email or password' && <span className='text-xs text-red-500'>{loginError}</span>}
                    </div>
                </div>

                <div className='w-full mx-auto'>
                    <ShadButton type='submit' className='bg-[#c743d8] text-white shadow-lg hover:bg-[#c764d4]'>
                        Log in
                    </ShadButton>
                </div>
                <p className='text-xs text-gray-500 w-full -m-2 mx-auto'>or</p>
                <Separator className='my-1' />
                <div className='w-full'>
                    <Link href='/signup'>
                        <ShadButton disabled={isSubmitting} className='bg-[#c743d8] text-white shadow-lg hover:bg-[#c764d4]'>
                            Create Free Account
                        </ShadButton>
                    </Link>
                </div>

                <div className='w-full'>
                    <ShadButton
                        type='button'
                        // onClick={signINWithGoogle}
                        // className='rounded-full border-solid border-2 border-black text-black bg-white mx-auto hover:bg-white'
                        variant='googleButton'>
                        Sign In With Google
                    </ShadButton>
                </div>

                {/* <div className='text-xs w-full text-center'>SIGN IN WITH GOOGLE PLACEHOLDER</div> */}
            </form>
            {/* <ShadButton onClick={logUser} className='mx-auto bg-[#f15daf] text-white shadow-lg hover:bg-[#c764d4]'>
                Log User
            </ShadButton> */}
        </div>
    );
};

export default LoginComponent;
