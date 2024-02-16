'use client';
import Link from 'next/link';
import React from 'react';
import CustomerInfoCard from '@/app/components/auth/customerCard/CustomerInfoCard';
import ConnectButton from '../../ConnectButton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/shadCn/ui/dropdown-menu';
import { current_user, jotai } from '@/app/jotai_store/store';

const AuthNav = () => {
    const [user] = jotai.useAtom(current_user);
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
            {user && (
                <div className='hidden lg:block'>
                    <CustomerInfoCard />
                </div>
            )}
            {!user && (
                <div className='hidden lg:block'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <h1 className='p-2 rounded-md bg-[#ff69b4] text-white'>Create Free Account</h1>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <div>
                                    <Link href='/signup'>
                                        <p>Create Free Account</p>
                                    </Link>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div>
                                    <Link href='/login'>
                                        <p>Login</p>
                                    </Link>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div>
                                    <Link href='/join'>
                                        <p>Become a creator</p>
                                    </Link>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </nav>
    );
};

export default AuthNav;
