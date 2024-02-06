import React from 'react';
import Header from '@/app/components/header/Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
    return (
        <main>
            <Header />
            <main className='flex justify-center mt-3'>{children}</main>
        </main>
    );
};

export default Layout;
