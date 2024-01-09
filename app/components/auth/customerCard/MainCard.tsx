import React from 'react';
import { Card, CardContent, CardHeader } from '@/app/components/shadCn/ui/card';
import { Avatar, AvatarImage } from '../../shadCn/ui/avatar';
import { Button } from '../../shadCn/ui/button';
import { Separator } from '../../shadCn/ui/separator';
import Image from 'next/image';

const MainCard = () => {
    return (
        <Card className='absolute m-2'>
            <CardHeader className=''>
                <div className='flex items-center px-5 gap-1'>
                    <Avatar>
                        <AvatarImage src='/icon_default.jpg' />
                    </Avatar>
                    <div className='flex flex-col items-start'>
                        <p className='text-xs font-bold'>Status: {'Anonymous'}</p>
                        <div className='flex items-center gap-2'>
                            <p className='text-xs font-bold'>DareCoins: {0}</p>
                            <p className='text-xs cursor-pointer'>(get more)</p>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col item-start gap-1'>
                    <span className='flex items-center gap-2 hover:bg-purple-700 transition-colors p-1 rounded-lg cursor-pointer group'>
                        <Image
                            className='invert group-hover:invert-0'
                            src='/assets/icons/home_icon_white.png'
                            width={30}
                            height={30}
                            alt='Home Icon'
                        />

                        <span className='text-left w-full group-hover:text-white'>Home</span>
                    </span>
                    <span className='flex items-center gap-2 hover:bg-purple-700 transition-colors p-1 rounded-lg cursor-pointer group'>
                        <Image
                            className='invert group-hover:invert-0'
                            src='/assets/icons/bell_icon_white.png'
                            width={30}
                            height={30}
                            alt='Home Icon'
                        />
                        <span className='text-left w-full group-hover:text-white'>Notifications</span>
                    </span>
                    <span className='flex items-center gap-2 hover:bg-purple-700 transition-colors p-1 rounded-lg cursor-pointer group'>
                        <Image
                            className='invert group-hover:invert-0'
                            src='/assets/icons/messages_icon_white.png'
                            width={27}
                            height={30}
                            alt='Home Icon'
                        />
                        <span className='text-left w-full group-hover:text-white'>Messages</span>
                    </span>

                    <Separator className='my-2' />
                    <Button className='w-full bg-purple-500 hover:bg-purple-400'>Connect</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default MainCard;
