'use client';
import React from 'react';
import { Button } from '../shadCn/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const SearchNav = () => {
    const path = usePathname();
    return (
        <div className='flex justify-center my-2 md:my-1 lg:my-0 w-screen'>
            <div className='flex justify-between gap-2'>
                <Link href='/1on1'>
                    <Button className='rounded-3xl transition-all' size='sm' variant={path === '/1on1' ? 'destructive' : 'searchNav'}>
                        1 on 1
                    </Button>
                </Link>
                <Link href='/'>
                    <Button className='rounded-3xl transition-all' size='sm' variant={path === '/' ? 'destructive' : 'searchNav'}>
                        Live
                    </Button>
                </Link>
                <Link href='/discover'>
                    <Button className='rounded-3xl transition-all' size='sm' variant={path === '/discover' ? 'destructive' : 'searchNav'}>
                        Discover
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SearchNav;
