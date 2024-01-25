import Link from 'next/link';
import React from 'react';
import CustomerInfoCard from '@/app/components/auth/customerCard/CustomerInfoCard';
import ConnectButton from '../../ConnectButton';

const AuthNav = () => {
    return (
        <nav className='flex items-center justify-around'>
            <div className=''>
                <Link href='/'>
                    <img src='/assets/logo/dLogoPng.png' alt='DaringConnections' className='w-[80px] sm:w-[90px] md:w-[100px]' />
                </Link>
            </div>

            <div className='lg:hidden'>
                <CustomerInfoCard />
                <ConnectButton />
            </div>
            <h1 className='hidden lg:block'>Create Free Account</h1>
        </nav>
    );
};

export default AuthNav;
