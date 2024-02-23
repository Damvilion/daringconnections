'use client';
import React from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/shadCn/ui/dialog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const OneonOneDialog = () => {
    const router = useRouter();
    return (
        <div>
            <Dialog
                defaultOpen={true}
                onOpenChange={() => {
                    router.push('/');
                }}>
                {/* <DialogTrigger>Open</DialogTrigger> */}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-center'>Create a Free Account to Join!</DialogTitle>

                        <DialogDescription>
                            To get into live 1 on 1 video chat, you need to create a free account. It's quick and easy!
                        </DialogDescription>
                        <div className='flex justify-between items-center'>
                            <Link
                                href='/signup'
                                className='text-center bg-[#e469ff] p-2 rounded-lg text-sm text-white hover:text-black transition-all ease-in hover:bg-[#ec98ff]'>
                                Create Free Account
                            </Link>
                            <Link
                                href='/'
                                className='rounded-full border-solid border-2 border-[#5c249e] text-black bg-white p-2 hover:bg-slate-50 hover:text-[#e469ff] text-sm ease-in transition-all'>
                                Back to Home
                            </Link>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OneonOneDialog;
