'use client';
import React from 'react';
import { DropdownMenu, DropdownMenuTrigger } from '../shadCn/ui/dropdown-menu';
import { Avatar, AvatarImage } from '../shadCn/ui/avatar';
import { jotai, current_user } from '@/app/jotai_store/store';

const ChannelAvatar = () => {
    const [user] = jotai.useAtom(current_user);
    return (
        <div className='mx-3'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={user?.profileUrl || '/icon_default.jpg'} />
                    </Avatar>
                </DropdownMenuTrigger>
                {/* <DropDown /> */}
            </DropdownMenu>
        </div>
    );
};

export default ChannelAvatar;
