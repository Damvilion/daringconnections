'use client';
import React from 'react';
import { Card, CardContent } from '@/app/components/shadCn/ui/card';
// import { Button } from '../../shadCn/ui/button';
import { Separator } from '@/app/components/shadCn/ui/separator';
import CustomerInfoCard from './CustomerInfoCard';
import CustomerCardContent from './CustomerCardContent';

import { jotai, current_user } from '@/app/jotai_store/store';
// import { useRouter } from 'next/navigation';
import ConnectButton from '@/app/components/ConnectButton';

const MainCard = () => {
    const [user] = jotai.useAtom(current_user);

    return (
        <Card className='mr-auto ml-auto lg:ml-2 lg:block hidden'>
            <CustomerInfoCard />
            <Separator className='my-2 w-[75%] mx-auto' />
            <CardContent>
                {user && <CustomerCardContent />}
                <ConnectButton />
            </CardContent>
        </Card>
    );
};

export default MainCard;
