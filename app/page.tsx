'use client';
import LiveKitGeneral from './components/LiveKit/LiveKitGeneral/LiveKitGeneral';
import MainCard from '@/app/components/auth/customerCard/MainCard';
import Header from './components/header/Header';
import Chatbox from './components/chatroom/Chatbox';
import { useEffect } from 'react';
import { current_profile } from './lib/current-profile';
import { Profile } from '@/app/lib/types/types';

import { jotai, userAtom, loadingUser } from '@/app/jotai_store/store';

export default function Home() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, setUser] = jotai.useAtom(userAtom);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = jotai.useAtom(loadingUser);

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
        <main>
            <Header />
            <div className='flex flex-col gap-1 lg:flex-row items-center justify-between'>
                <MainCard />
                <LiveKitGeneral />
                <Chatbox />
            </div>
        </main>
    );
}
