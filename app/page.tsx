'use client';
import LiveKitGeneral from '@/app/components/LiveKit/LiveKitGeneral/LiveKitGeneral';
import MainCard from '@/app/components/auth/customerCard/MainCard';
import { useEffect } from 'react';
import { current_profile } from '@/app/lib/current-profile';
import { Profile } from '@/app/lib/types/types';

import { jotai, current_user, loadingUser } from '@/app/jotai_store/store';
import AuthNav from './components/auth/nav/AuthNav';
import SearchNav from './components/search/SearchNav';
import About from './components/infopages/cutomerInfo/About';

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
            <SearchNav />
            <div className='flex flex-col gap-1 xl:flex-row items-center justify-between w-[100vw]'>
                <MainCard />
                <LiveKitGeneral />
            </div>
            <About />
        </main>
    );
}
