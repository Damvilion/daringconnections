'use client';
import { jotai, loadingUser, liveKitConnection, current_user } from '@/app/jotai_store/store';
import { current_profile } from '@/app/lib/current-profile';
import { Profile } from '@/app/lib/types/types';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [, setUserLoading] = jotai.useAtom(loadingUser);
    const [, setLiveKitConnection] = jotai.useAtom(liveKitConnection);
    const [, setUser] = jotai.useAtom(current_user);

    useEffect(() => {
        setLiveKitConnection(false);
        const getProfile = async () => {
            const profile: Profile = (await current_profile()) as Profile;

            if (profile) {
                setUser(profile);
                setLoading(false);
                setUserLoading(false);
            } else {
                router.push('/login');
            }
        };

        getProfile();
    }, []);

    return (
        <main className='flex flex-col items-center'>
            {loading && (
                <div className='h-screen w-full flex justify-center items-center'>
                    {<Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                    {<p className='font-bold text-lg md:text-2xl lg:text-4xl'>Loading Profile...</p>}
                </div>
            )}

            {!loading && children}
        </main>
    );
};

export default Layout;
