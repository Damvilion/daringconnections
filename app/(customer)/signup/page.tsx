'use client';
import React from 'react';
import SignUpComponent from '@/app/components/authForms/customerAuth/SignUpComponent';
import { useRouter } from 'next/navigation';
import { current_profile } from '@/app/lib/current-profile';

const Page = () => {
    const router = useRouter();
    const getUser = async () => {
        const user = await current_profile();
        if (user) {
            router.push('/');
        }
    };
    getUser();
    return (
        <div className='flex flex-col text-center'>
            <SignUpComponent />
        </div>
    );
};

export default Page;
