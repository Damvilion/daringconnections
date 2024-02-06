'use client';
import LiveKitGeneral from '@/app/components/LiveKit/LiveKitGeneral/LiveKitGeneral';
import MainCard from '@/app/components/auth/customerCard/MainCard';
import { useEffect } from 'react';
import { current_profile } from '@/app/lib/current-profile';
import { Profile } from '@/app/lib/types/types';

import { jotai, current_user, loadingUser } from '@/app/jotai_store/store';
import AuthNav from './components/auth/nav/AuthNav';

export default function Home() {
    const [, setUser] = jotai.useAtom(current_user);

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

    return (
        <main>
            <header>
                <AuthNav />
            </header>
            <div className='flex flex-col gap-1 lg:flex-row items-center justify-between'>
                <MainCard />
                <LiveKitGeneral />
            </div>
        </main>
    );
}
