'use client';
import Link from 'next/link';
import React from 'react';

const NavBar = () => {
    return (
        <nav className='flex items-center justify-around'>
            <Link href='/'>
                <img src='/assets/logo/dLogoPng.png' alt='DaringConnections' className='w-[80px] sm:w-[90px] md:w-[100px]' />
            </Link>
        </nav>
    );
};

export default NavBar;
