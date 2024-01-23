'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ISignUpSchema, influencerSignUpSchema } from '@/app/lib/types/types';
import axios, { AxiosResponse } from 'axios';
import { Button as ShadButton } from '@/app/components/shadCn/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const InfluencerFormComponent = () => {
    type AxiosErrorType = 'Email & Username already exists' | 'Email already exists' | 'Username already exists' | 'FAILED';
    interface AxiosResponseAdd extends AxiosResponse {
        data: {
            message: 'FAILED' | 'ISSUE' | 'SUCCESS';
            type: AxiosErrorType;
        };
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ISignUpSchema>({
        resolver: zodResolver(influencerSignUpSchema),
    });

    const [errorType, setErrorType] = useState<AxiosErrorType | ''>('');
    const router = useRouter();

    const onSubmit = async (data: ISignUpSchema) => {
        console.log(data);
        try {
            const res: AxiosResponseAdd = await axios.post('/api/auth/influencerSignUp', data);
            console.log(res.data);

            if (res.data.message === 'ISSUE') {
                setErrorType(res.data.type);
                return;
            } else if (res.data.message === 'FAILED') {
                setErrorType('FAILED');
                return;
            } else if (res.data.message === 'SUCCESS') {
                setErrorType('');
                router.push('/account/channel');
            }
        } catch (error) {
            setErrorType('FAILED');
        }
        reset();
    };

    return (
        <div className='border-slate-900 border-solid border rounded-md shadow-md p-3 sm:p-4 md:p-7 lg:p-10 mb-3'>
            <h1 className='font-bold text-purple-800 text-medium md:text-xl text-center'>Join Daring Connections!</h1>
            <p className='text-xs md:text-base my-1'>
                You must be over <strong>18</strong> years old to join
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-start'>
                {/* EMAIL */}
                <div className='flex flex-col sm:flex-row gap-1 items-center w-full'>
                    <label className='text-xs md:text-base lg:text-lg' htmlFor='username'>
                        Email
                    </label>
                    <div className='flex flex-col sm:ml-auto'>
                        <input
                            {...register('email', {
                                onChange: () => setErrorType(''),
                            })}
                            className='text-sm md:text-base border-solid border border-black p-2 md:p-3 rounded-md'
                            type='text'
                        />
                        {errors.email && <p className='text-red-500 text-xs'>{`${errors.email.message}`}</p>}
                        {errorType === 'Email & Username already exists' && <p className='text-red-500 text-xs'>{errorType}</p>}
                        {errorType === 'Email already exists' && <p className='text-red-500 text-xs'>{errorType}</p>}
                    </div>
                </div>
                {/* NAME */}
                <div className='flex flex-col sm:flex-row gap-1 items-center w-full'>
                    <label className='text-xs md:text-base lg:text-lg' htmlFor='username'>
                        Name
                    </label>

                    <div className='flex flex-col sm:ml-auto'>
                        <input
                            {...register('name', {
                                onChange: () => setErrorType(''),
                            })}
                            className='text-sm md:text-base border-solid border border-black p-2 md:p-3 rounded-md'
                            type='text'
                        />
                        {errors.name && <p className='text-red-500 text-xs'>{`${errors.name.message}`}</p>}
                        {errorType === 'Username already exists' && <p className='text-red-500 text-xs'>{errorType}</p>}
                    </div>
                </div>

                {/* USERNAME */}
                <div className='flex flex-col sm:flex-row gap-1 items-center w-full'>
                    <label className='text-xs md:text-base lg:text-lg' htmlFor='username'>
                        Username
                    </label>

                    <div className='flex flex-col sm:ml-auto'>
                        <input
                            {...register('username', {
                                onChange: () => setErrorType(''),
                            })}
                            className='text-sm md:text-base border-solid border border-black p-2 md:p-3 rounded-md'
                            type='text'
                        />
                        {errors.username && <p className='text-red-500 text-xs'>{`${errors.username.message}`}</p>}
                        {errorType === 'Username already exists' && <p className='text-red-500 text-xs'>{errorType}</p>}
                    </div>
                </div>

                {/* PASSWORD */}
                <div className='flex flex-col sm:flex-row gap-1 items-center w-full'>
                    <label className='text-xs md:text-base lg:text-lg' htmlFor='password'>
                        Password
                    </label>
                    <div className='flex flex-col sm:ml-auto'>
                        <input
                            {...register('password')}
                            className='text-sm md:text-base border-solid border border-black p-2 md:p-3 rounded-md'
                            type='password'
                        />
                        {errors.password && <p className='text-red-500 text-xs'>{`${errors.password.message}`}</p>}
                    </div>
                </div>
                {/* CONFIRM PASSWORD */}
                <div className='flex flex-col sm:flex-row gap-1 items-center w-full'>
                    <label className='flex gap-1 sm:flex sm:flex-col md:flex md:flex-col md:gap-0 text-xs md:text-base lg:text-lg' htmlFor='password'>
                        <p>Confirm</p>
                        <p>Password</p>
                    </label>
                    <div className='flex flex-col sm:ml-auto'>
                        <input
                            {...register('confirmPassword')}
                            className='text-sm md:text-base border-solid border border-black p-2 md:p-3 rounded-md'
                            type='password'
                        />
                        {errors.confirmPassword && <p className='text-red-500 text-xs'>{errors.confirmPassword.message}</p>}
                    </div>
                </div>

                {/* CHECKBOXES */}
                <div className='flex flex-row items-start gap-1 sm:items-center w-full'>
                    <input type='checkbox' {...register('over18')} />
                    <div className='flex flex-col'>
                        <label className='text-xs md:text-sm text-left' htmlFor='over18'>
                            I am over 18 years old
                        </label>
                        {errors.over18 && <p className='text-left text-red-500 text-xs'>{errors.over18.message}</p>}
                    </div>
                </div>
                <div className='flex flex-row items-start gap-1 sm:items-center w-full'>
                    <input type='checkbox' {...register('termsAndConditions')} />
                    <div className='flex flex-col'>
                        <label className='text-xs md:text-sm text-left' htmlFor='termsAndConditions'>
                            I have read and agree to the Terms and Conditions
                        </label>
                        {errors.termsAndConditions && <p className='text-left text-red-500 text-xs'>{errors.termsAndConditions.message}</p>}
                    </div>
                </div>
                <div className='flex flex-row items-start gap-1 sm:items-center w-full'>
                    <input type='checkbox' {...register('privacyPolicy')} />
                    <div className='flex flex-col'>
                        <label className='text-xs md:text-sm text-left' htmlFor='privacyPolicy'>
                            I have read and agree to the privacy policy
                        </label>
                        {errors.privacyPolicy && <p className='text-left text-red-500 text-xs'>{errors.privacyPolicy.message}</p>}
                    </div>
                </div>
                <div className='w-full mx-auto'>
                    <ShadButton disabled={isSubmitting} type='submit' className='bg-[#c743d8] text-white shadow-lg hover:bg-[#c764d4]'>
                        {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                        CREATE FREE ACCOUNT
                    </ShadButton>
                    {errorType === 'FAILED' && (
                        <p className='text-red-500 text-xs my-1 cursor-pointer'>
                            Issue Creating Account <strong>Contact Support</strong>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default InfluencerFormComponent;
