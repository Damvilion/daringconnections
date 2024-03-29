import React from 'react';
import { DropdownMenuContent, DropdownMenuItem } from '@/app/components/shadCn/ui/dropdown-menu';
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

    const renderCreateItems = () => {
        return (
            <div>
                <DropdownMenuItem onClick={() => router.push('/signup')} className='text-center mx-auto'>
                    Create free account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/login')} className='text-center mx-auto'>
                    Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/join')}>Become a Creator</DropdownMenuItem>
            </div>
        );
    };
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
                <div>{renderCreateItems()}</div>
            )}
        </DropdownMenuContent>
    );
};

export default DropDown;
