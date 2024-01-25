import React from 'react';
import { current_user, jotai } from '@/app/jotai_store/store';
import { useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './shadCn/ui/tooltip';

const ConnectButton = () => {
    const [user] = jotai.useAtom(current_user);
    const router = useRouter();

    const handleClick = () => {
        if (!user) {
            router.push('/signup');
        }
    };
    return (
        <TooltipProvider>
            <Tooltip delayDuration={250}>
                <TooltipTrigger
                    onClick={handleClick}
                    className='w-full bg-purple-500 hover:bg-purple-400 text-white h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                    Connect
                    <TooltipContent side='bottom'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-center text-sm'>Direct message - 1 on 1 video calls & more</span>
                        </div>
                    </TooltipContent>
                </TooltipTrigger>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ConnectButton;
