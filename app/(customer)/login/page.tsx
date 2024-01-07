'use client';
import React from 'react';
import LoginComponent from '@/app/components/authForms/customerAuth/LoginComponent';
import { current_profile } from '@/app/lib/current-profile';
import { useRouter } from 'next/navigation';

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
            <LoginComponent />
        </div>
    );
};

export default Page;
