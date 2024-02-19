'use client';
import React, { useState } from 'react';
import { Button as ShadButton } from '@/app/components/shadCn/ui/button';
import Link from 'next/link';
import { Separator } from '@/app/components/shadCn/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TLoginSchema, customerLoginSchema } from '@/app/lib/types/types';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FirebaseAuth, FirebaseGoogleAuthProvider } from '@/firebase/firebase-config';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

const LoginComponent = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    interface FirebaseErrors {
        code: string;
        message: string;
    }
    type LoginErrorType = 'Problem finding email or password' | '';

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
            await signInWithEmailAndPassword(FirebaseAuth, data.email, data.password);
            router.push('/');
        } catch (error) {
            if ((error as FirebaseErrors).message === 'Firebase: Error (auth/invalid-credential).') {
                setLoginError('Problem finding email or password');
            }
        }
        reset();
    };

    const signINWithGoogle = () => {
        setLoading(true);
        signInWithPopup(FirebaseAuth, FirebaseGoogleAuthProvider)
            .then((result) => {
                if (result.user) {
                    setLoading(false);

                    const { displayName, email, photoURL, uid } = result.user;
                    try {
                        axios.post('/api/auth/customerSignUp', { username: displayName, email, photoURL, uid, type: 'google' }).then(() => {
                            router.push('/');
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.log(errorCode, errorMessage, email, credential);
                // ...
            })
            .finally(() => setLoading(false));
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
                        {loginError === 'Problem finding email or password' && <span className='text-xs text-red-500'>{loginError}</span>}
                        {errors.password && <span className='text-xs text-red-500'>{errors.password.message}</span>}
                    </div>
                </div>

                <div className='w-full mx-auto'>
                    <ShadButton type='submit' className='bg-[#c743d8] text-white shadow-lg hover:bg-[#c764d4]'>
                        {isSubmitting && <Loader2 className='animate-spin' size={18} />}
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
                        onClick={signINWithGoogle}
                        // className='rounded-full border-solid border-2 border-black text-black bg-white mx-auto hover:bg-white'
                        variant='googleButton'>
                        {loading && <Loader2 className='animate-spin' size={18} />}
                        Sign In With Google
                    </ShadButton>
                </div>
            </form>
        </div>
    );
};

export default LoginComponent;
