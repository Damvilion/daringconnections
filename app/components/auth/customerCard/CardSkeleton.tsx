import React from 'react';
import { Skeleton } from '../../shadCn/ui/skeleton';
const CardSkeleton = () => {
    return (
        <div className='flex items-center px-5 gap-1'>
            <Skeleton className='h-12 w-12 rounded-full' />
            <div className='flex flex-col items-start'>
                <div className='flex flex-col items-center gap-2'>
                    <Skeleton className='h-4 w-[200px]' />
                    <Skeleton className='h-4 w-[200px]' />
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
