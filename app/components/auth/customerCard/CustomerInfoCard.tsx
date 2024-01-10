'use client';
import React from 'react';
import { CardHeader } from '@/app/components/shadCn/ui/card';
import { Avatar, AvatarImage } from '@/app/components/shadCn/ui/avatar';

import { DropdownMenu, DropdownMenuTrigger } from '@/app/components/shadCn/ui/dropdown-menu';
import DropDown from './DropDown';
import CardSkeleton from './CardSkeleton';

interface CustomerInfoCardProps {
    id?: string;
    username?: string;
    dareCoins?: number;
    email?: string;
    loading?: boolean;
}

const CustomerInfoCard = ({ username, dareCoins, loading }: CustomerInfoCardProps) => {
    return (
        <CardHeader className=''>
            {loading ? (
                <CardSkeleton />
            ) : (
                <div className='flex items-center px-5 gap-1'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src='/icon_default.jpg' />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropDown />
                    </DropdownMenu>
                    <div className='flex flex-col items-start'>
                        <div className='flex flex-row gap-1 items-center'>
                            <p className='text-xs font-bold'>Status: </p>
                            <p className='text-xs font-bold'>{username ? username : 'Anonymous'}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='flex flex-row gap-1 items-center'>
                                <p className='text-xs font-bold'>DareCoins: </p>
                                <p className='text-xs font-bold'>{dareCoins ? dareCoins : 0} </p>
                            </div>
                            <div className='flex gap-1'>
                                <p className='text-xs text-red-600 cursor-pointer'>(get</p>
                                <p className='text-xs text-red-600 cursor-pointer'>more)</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </CardHeader>
    );
};

// const AnonymousCard = () => {
//     return (
//         <div className='flex items-center px-5 gap-1'>
//             <DropdownMenu>
//                 <DropdownMenuTrigger>
//                     <Avatar>
//                         <AvatarImage src='/icon_default.jpg' />
//                     </Avatar>
//                 </DropdownMenuTrigger>
//                 <DropDown />
//             </DropdownMenu>
//             <div className='flex flex-col items-start'>
//                 <div className='flex flex-row gap-1 items-center'>
//                     <p className='text-xs font-bold'>Status: </p>
//                     <p className='text-xs font-bold'>Anonymous</p>
//                 </div>
//                 <div className='flex items-center gap-2'>
//                     <div className='flex flex-row gap-1 items-center'>
//                         <p className='text-xs font-bold'>DareCoins: </p>
//                         <p className='text-xs font-bold'>{0} </p>
//                     </div>
//                     <div className='flex gap-1'>
//                         <p className='text-xs text-red-600 cursor-pointer'>(get</p>
//                         <p className='text-xs text-red-600 cursor-pointer'>more)</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

export default CustomerInfoCard;
