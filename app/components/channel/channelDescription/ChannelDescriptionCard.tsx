'use client';
import React, { useEffect, useState } from 'react';
import { Separator } from '../../shadCn/ui/separator';
import { current_user, jotai } from '@/app/jotai_store/store';
import axios from 'axios';
import { Profile } from '@/app/lib/types/types';
import { Skeleton } from '../../shadCn/ui/skeleton';

const ChannelDescriptionCard = () => {
    const [user] = jotai.useAtom(current_user);
    const [loading, setLoading] = useState(true);

    const getData = async (user: Profile) => {
        if (user.id) {
            const resp = await axios.post('/api/influencer/getFollowerCount', { id: user.id });
            console.log(resp.data);
            if (resp.data) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (user) {
            getData(user);
        }
    }, [user]);
    return (
        <div className='bg-[#18181b] w-4/6 p-5 rounded-md flex flex-col my-1'>
            <p className='text-xs md:text-base lg:text-lg text-white'>{0} followers</p>
            <Separator className='my-2' />
            {loading && <Skeleton className='w-2/3 h-4' />}
            {!loading && <p className='text-xs md:text-base lg:text-lg text-white'>Official Woman respecter! Certified hobo.</p>}
        </div>
    );
};

export default ChannelDescriptionCard;
