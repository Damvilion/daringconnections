import Link from 'next/link';
import React from 'react';
import CustomerInfoCard from '../../auth/customerCard/CustomerInfoCard';

const ChannelHeader = () => {
    return (
        <header>
            <nav className='flex justify-between items-center text-black'>
                <Link href='/'>
                    <img src='/assets/logo/dLogoPng.png' alt='DaringConnections' className='w-[80px]' />
                </Link>
                <CustomerInfoCard />
            </nav>
        </header>
    );
};

export default ChannelHeader;
