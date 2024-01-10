import React, { useState } from 'react';
import {
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
} from '@/app/components/shadCn/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { FirebaseAuth } from '@/app/firebase/firebase-config';
import { current_profile } from '@/app/lib/current-profile';
import { useRouter } from 'next/navigation';

const DropDown = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const getUser = async () => {
        const user = await current_profile();
        if (!user) return;
        setIsLoggedIn(true);
    };
    getUser();

    const handleLogout = async () => {
        const res = await signOut(FirebaseAuth);
        console.log(res);
        setIsLoggedIn(false);
        router.refresh();
    };

    return (
        <DropdownMenuContent>
            {isLoggedIn ? (
                <DropdownMenuItem onClick={handleLogout} className='text-center mx-auto'>
                    Sign out
                </DropdownMenuItem>
            ) : (
                <DropdownMenuItem onClick={() => router.push('/signup')} className='text-center mx-auto'>
                    Create an account
                </DropdownMenuItem>
            )}
        </DropdownMenuContent>
    );
};

export default DropDown;
