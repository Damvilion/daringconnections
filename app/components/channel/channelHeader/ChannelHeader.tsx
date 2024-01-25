import Link from 'next/link';
import React from 'react';
import ChannelAvatar from '@/app/components/channel/ChannelAvatar';

const ChannelHeader = () => {
    return (
        <header>
            <nav className='flex justify-between items-center text-black'>
                <Link href='/'>
                    <img src='/assets/logo/dLogoPng.png' alt='DaringConnections' className='w-[80px]' />
                </Link>
                <ChannelAvatar />
            </nav>
        </header>
    );
};

export default ChannelHeader;
