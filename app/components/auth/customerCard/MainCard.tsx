import React from 'react';
import { Card, CardContent, CardHeader } from '@/app/components/shadCn/ui/card';
import { Avatar, AvatarImage } from '../../shadCn/ui/avatar';
import { Button } from '../../shadCn/ui/button';
import { Separator } from '../../shadCn/ui/separator';

const MainCard = () => {
    return (
        <Card className='absolute m-2'>
            <CardHeader className=''>
                <div className='flex px-5'>
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
                <div className='flex flex-col gap-1'>
                    <Button className='w-full'>Home</Button>
                    <Button className='w-full'>Messages</Button>
                    <Button className='w-full'>Notifications</Button>
                    <Separator className='my-2' />
                    <Button className='w-full'>Connect</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default MainCard;
