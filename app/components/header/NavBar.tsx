'use client';
import Image from 'next/image';
import React from 'react';
import dLogoPng from '@/app/assets/logo/dLogoPng.png';

const NavBar = () => {
    return (
        <nav className='flex items-center justify-around'>
            <Image src={dLogoPng} alt='DaringConnections' width={100} height={100} />
        </nav>
    );
};

export default NavBar;
