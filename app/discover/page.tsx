'use client';
import React, { useEffect } from 'react';
import SearchNav from '../components/search/SearchNav';
import AuthNav from '../components/auth/nav/AuthNav';
import { current_profile } from '../lib/current-profile';
import { Profile } from '../lib/types/types';
import { jotai, current_user, loadingUser } from '@/app/jotai_store/store';

const Page = () => {
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
        </main>
    );
};

export default Page;
