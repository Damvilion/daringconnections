import Image from 'next/image';
import React from 'react';
import { Separator } from '../../shadCn/ui/separator';

const CustomerCardContent = () => {
    return (
        <div className='flex flex-col item-start gap-1'>
            <span className='flex items-center gap-2 hover:bg-purple-700 transition-colors p-1 rounded-lg cursor-pointer group'>
                <Image className='invert group-hover:invert-0' src='/assets/icons/home_icon_white.png' width={30} height={30} alt='Home Icon' />

                <span className='text-left w-full group-hover:text-white'>Home</span>
            </span>
            <span className='flex items-center gap-2 hover:bg-purple-700 transition-colors p-1 rounded-lg cursor-pointer group'>
                <Image className='invert group-hover:invert-0' src='/assets/icons/bell_icon_white.png' width={30} height={30} alt='Home Icon' />
                <span className='text-left w-full group-hover:text-white'>Notifications</span>
            </span>
            <span className='flex items-center gap-2 hover:bg-purple-700 transition-colors p-1 rounded-lg cursor-pointer group'>
                <Image className='invert group-hover:invert-0' src='/assets/icons/messages_icon_white.png' width={27} height={30} alt='Home Icon' />
                <span className='text-left w-full group-hover:text-white'>Messages</span>
            </span>

            <Separator className='my-2' />
        </div>
    );
};

export default CustomerCardContent;
