import React from 'react';
import {
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
} from '@/app/components/shadCn/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { FirebaseAuth } from '@/app/firebase/firebase-config';
import { useRouter } from 'next/navigation';
import { jotai, userAtom } from '@/app/jotai_store/store';

const DropDown = () => {
    const router = useRouter();
    const [user, setUser] = jotai.useAtom(userAtom);

    const handleLogout = async () => {
        await signOut(FirebaseAuth);
        setUser(null);
        router.refresh();
    };

    return (
        <DropdownMenuContent>
            {user ? (
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
