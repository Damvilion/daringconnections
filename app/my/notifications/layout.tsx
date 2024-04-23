import ChannelHeader from '@/app/components/channel/channelHeader/ChannelHeader';
import React from 'react';
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <main className='w-full'>
            <ChannelHeader />
            {children}
        </main>
    );
};

export default Layout;
