'use client';
import React, { useEffect } from 'react';
import AuthNav from '../components/auth/nav/AuthNav';
import SearchNav from '../components/search/SearchNav';
import { jotai, current_user, loadingUser } from '@/app/jotai_store/store';

import { current_profile } from '../lib/current-profile';
import { Profile } from '../lib/types/types';
import { Loader2 } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [, setUser] = jotai.useAtom(current_user);

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
            <header>
                <AuthNav />
            </header>
            <SearchNav />
            {loading && <div className='flex justify-center items-center mt-5'>{<Loader2 className='mr-2 h-8 w-10 animate-spin' />}</div>}
            {!loading && children}
        </main>
    );
};

export default Layout;
