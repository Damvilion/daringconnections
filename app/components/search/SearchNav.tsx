'use client';
import React from 'react';
import { Button } from '../shadCn/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const SearchNav = () => {
    const path = usePathname();
    return (
        <div className='flex justify-center my-2'>
            <div className='flex justify-between gap-2'>
                <Link href='/1on1'>
                    <Button variant={path === '/1on1' ? 'destructive' : 'default'}>1 on 1</Button>
                </Link>
                <Link href='/'>
                    <Button className='' variant={path === '/' ? 'destructive' : 'default'}>
                        Live
                    </Button>
                </Link>
                <Link href='/discover'>
                    <Button variant={path === '/discover' ? 'destructive' : 'default'}>Discover</Button>
                </Link>
            </div>
        </div>
    );
};

export default SearchNav;
