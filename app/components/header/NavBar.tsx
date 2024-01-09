'use client';
import Image from 'next/image';
import React from 'react';

const NavBar = () => {
    return (
        <nav className='flex items-center justify-around'>
            <Image src='/assets/logo/dLogoPng.png' alt='DaringConnections' width={100} height={100} />
        </nav>
    );
};

export default NavBar;
