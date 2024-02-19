import React from 'react';
import {
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
} from '@/app/components/shadCn/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { FirebaseAuth } from '@/firebase/firebase-config';
import { useRouter } from 'next/navigation';
import { jotai, current_user } from '@/app/jotai_store/store';

const DropDown = () => {
    const router = useRouter();
    const [user, setUser] = jotai.useAtom(current_user);

    const handleLogout = async () => {
        await signOut(FirebaseAuth);
        setUser(null);
        router.push('/');
    };

    const handleChannel = () => {
        router.push('/account/channel');
    };

    const renderSignOutMenuItem = () => (
        <DropdownMenuItem onClick={handleLogout} className='text-center mx-auto'>
            Sign out
        </DropdownMenuItem>
    );

    const renderChannelMenuItem = () => (
        <DropdownMenuItem onClick={handleChannel} className='text-center mx-auto'>
            Channel
        </DropdownMenuItem>
    );

    const renderCreateAccountMenuItem = () => (
        <DropdownMenuItem onClick={() => router.push('/signup')} className='text-center mx-auto'>
            Create free account
        </DropdownMenuItem>
    );
    const renderLoginAccountMenuItem = () => (
        <DropdownMenuItem onClick={() => router.push('/login')} className='text-center mx-auto'>
            Login
        </DropdownMenuItem>
    );

    return (
        <DropdownMenuContent>
            {user?.isCamUser ? (
                <div>
                    {renderSignOutMenuItem()}
                    {renderChannelMenuItem()}
                </div>
            ) : user ? (
                renderSignOutMenuItem()
            ) : (
                <div>
                    {renderCreateAccountMenuItem()}
                    {renderLoginAccountMenuItem()}
                </div>
            )}
        </DropdownMenuContent>
    );
};

export default DropDown;
