import Link from 'next/link';
import React from 'react';

const NavBar = () => {
    return (
        <nav className='flex items-center justify-around'>
            <Link href='/'>
                <img src='/assets/logo/dLogoPng.png' alt='DaringConnections' className='w-[70px] sm:w-[80px] md:w-[90px]' />
            </Link>
        </nav>
    );
};

export default NavBar;
