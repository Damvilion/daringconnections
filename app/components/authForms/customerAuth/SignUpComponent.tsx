'use client';
import React from 'react';
import { Button as NextButton } from '@nextui-org/react';
// import { Button as ShadButton } from '@/app/components/shadCn/ui/button';
// import { Loader2 } from 'lucide-react';
const SignUpComponent = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitted');
        console.log(e);
    };
    return (
        <div className='border-slate-900 border-solid border rounded-md shadow-md p-3 sm:p-4 md:p-7 lg:p-10'>
            <h1 className='font-bold text-purple-800 text-lg'>Create Your Free Account!</h1>
            <p className='text-sm'>
                You must be over <strong>18</strong> years old to register
            </p>
            <form className='flex flex-col gap-2 items-center' onSubmit={handleSubmit}>
                <div className='flex flex-col sm:flex-row gap-1 items-center'>
                    <label htmlFor='username'>Username</label>
                    <input className='border-solid border border-black p-3 rounded-md' type='text' required />
                </div>

                <div className='flex flex-col sm:flex-row gap-1 items-center'>
                    <label htmlFor='password'>Password</label>

                    <input className='border-solid border border-black p-3 rounded-md' type='password' required />
                </div>
                <div className='flex flex-col sm:flex-row gap-1 items-center'>
                    <label htmlFor='password'>Confirm Password</label>

                    <input className='border-solid border border-black p-3 rounded-md' type='password' required />
                </div>

                <NextButton type='submit' className='bg-[#c743d8] text-white shadow-lg'>
                    CREATE FREE ACCOUNT
                </NextButton>
                {/* <ShadButton  disabled variant='default'>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' size={16} />
                    CREATE FREE ACCOUNT
                </ShadButton> */}
            </form>
        </div>
    );
};

export default SignUpComponent;
