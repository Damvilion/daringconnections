'use client';
import React from 'react';
import { Button } from '../shadCn/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const SearchNav = () => {
    const path = usePathname();
    return (
        <div className='flex justify-center my-2 w-screen'>
            <div className='flex justify-between gap-2'>
                <Link href='/1on1'>
                    <Button className='rounded-3xl transition-all' size='sm' variant={path === '/1on1' ? 'destructive' : 'googleButton'}>
                        1 on 1
                    </Button>
                </Link>
                <Link href='/'>
                    <Button className='rounded-3xl transition-all' size='sm' variant={path === '/' ? 'destructive' : 'googleButton'}>
                        Live
                    </Button>
                </Link>
                <Link href='/discover'>
                    <Button className='rounded-3xl transition-all' size='sm' variant={path === '/discover' ? 'destructive' : 'googleButton'}>
                        Discover
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SearchNav;
