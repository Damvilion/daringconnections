'use client';
import React from 'react';
import { Card, CardContent } from '@/app/components/shadCn/ui/card';
import { Button } from '../../shadCn/ui/button';
import { Separator } from '@/app/components/shadCn/ui/separator';
import CustomerInfoCard from './CustomerInfoCard';
import CustomerCardContent from './CustomerCardContent';

import { jotai, current_user } from '@/app/jotai_store/store';
import { useRouter } from 'next/navigation';

const MainCard = () => {
    const router = useRouter();
    const [user] = jotai.useAtom(current_user);
    const handleClick = () => {
        if (!user) {
            router.push('/signup');
        }
    };
    return (
        <Card className='mr-auto ml-auto lg:block hidden'>
            <CustomerInfoCard />
            <Separator className='my-2 w-[75%] mx-auto' />
            <CardContent>
                {user && <CustomerCardContent />}
                <Button onClick={handleClick} className='w-full bg-purple-500 hover:bg-purple-400'>
                    Connect
                </Button>
            </CardContent>
        </Card>
    );
};

export default MainCard;
