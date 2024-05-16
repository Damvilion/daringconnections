import React from 'react';
import { DropdownMenuContent, DropdownMenuItem } from '@/app/components/shadCn/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { FirebaseAuth } from '@/firebase/firebase-config';
import { usePathname, useRouter } from 'next/navigation';
import { jotai, current_user } from '@/app/jotai_store/store';
import { Separator } from '../../shadCn/ui/separator';

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

    const path = usePathname();
    const menuItemOptions = () => {
        return (
            <div>
                {path === '/' ? null : <DropdownMenuItem onClick={() => router.push('/')}>Home</DropdownMenuItem>}
                {path === '/my/notifications' ? null : (
                    <DropdownMenuItem onClick={() => router.push('/my/notifications')}>Notifications</DropdownMenuItem>
                )}
                {path === '/my/messages' ? null : <DropdownMenuItem onClick={() => router.push('/my/messages')}>Messages</DropdownMenuItem>}
            </div>
        );
    };
    return (
        <DropdownMenuContent>
            {user?.isCamUser ? (
                <div>
                    {menuItemOptions()}
                    <Separator />
                    {renderChannelMenuItem()}
                    {renderSignOutMenuItem()}
                </div>
            ) : user ? (
                <div>
                    {menuItemOptions()}
                    <Separator />
                    {renderSignOutMenuItem()}
                </div>
            ) : (
                <div>{renderCreateItems()}</div>
            )}
        </DropdownMenuContent>
    );
};

export default DropDown;
