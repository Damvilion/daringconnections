'use client';
import React, { useEffect } from 'react';
import { current_profile } from '../lib/current-profile';
import { Profile } from '../lib/types/types';
import { jotai, current_user, loadingUser } from '@/app/jotai_store/store';
import OneonOneDialog from './components/OneonOneDialog';

const Page = () => {
    const [user, setUser] = jotai.useAtom(current_user);

    const [, setLoading] = jotai.useAtom(loadingUser);
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

    const renderScreen = () => {
        return (
            <div className='w-screen flex flex-col md:flex-row gap-2 p-4'>
                <div className='bg-black rounded-xl'>
                    <video height={720} width={1280} className='object-contain aspect-video'></video>
                </div>
                <div className='bg-black rounded-xl'>
                    <video height={720} width={1280} src=''></video>
                </div>
            </div>
        );
    };

    return (
        <div className='w-screen flex flex-col justify-center items-center'>
            {!user && <OneonOneDialog />}

            {user && renderScreen()}
        </div>
    );
};

export default Page;
