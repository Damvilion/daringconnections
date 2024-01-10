'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/app/components/shadCn/ui/card';
import { Button } from '../../shadCn/ui/button';
import { Separator } from '@/app/components/shadCn/ui/separator';
import { current_profile } from '@/app/lib/current-profile';
import CustomerInfoCard from './CustomerInfoCard';
import CustomerCardContent from './CustomerCardContent';

// import CardSkeleton from './CardSkeleton';

const MainCard = () => {
    type Profile = {
        id: string;
        username: string;
        dareCoins: number;
        email?: string;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, setUser] = useState<null | Profile>(null);
    const [loading, setLoading] = useState(true);
    const getUser = async () => {
        const user: Profile = (await current_profile()) as Profile;
        if (!user) {
            setLoading(false);
            return;
        }

        setUser(user);
        setLoading(false);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Card className='mr-auto ml-auto lg:block hidden'>
            <CustomerInfoCard username={user?.username} dareCoins={user?.dareCoins} loading={loading} />
            <Separator className='my-2 w-[75%] mx-auto' />
            <CardContent>
                {user?.username && <CustomerCardContent />}
                <Button className='w-full bg-purple-500 hover:bg-purple-400'>Connect</Button>
            </CardContent>
        </Card>
    );
};

export default MainCard;
