import React from 'react';
import Header from '@/app/components/header/Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
    return (
        <main>
            <Header />
            <main className='flex flex-col min-h-screen items-center justify-center'>{children}</main>
        </main>
    );
};

export default Layout;
