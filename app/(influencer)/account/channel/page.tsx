import ChannelComponent from '@/app/components/channel/ChannelComponent';
import ChannelHeader from '@/app/components/channel/channelHeader/ChannelHeader';
import React from 'react';

const Page = () => {
    return (
        <main>
            <ChannelHeader />
            <ChannelComponent />
        </main>
    );
};

export default Page;
