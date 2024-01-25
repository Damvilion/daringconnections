import ChannelComponent from '@/app/components/channel/ChannelComponent';
import ChannelHeader from '@/app/components/channel/channelHeader/ChannelHeader';
import React from 'react';

const Page = () => {
    return (
        <div className='h-screen w-full'>
            <ChannelHeader />
            <ChannelComponent />
        </div>
    );
};

export default Page;
