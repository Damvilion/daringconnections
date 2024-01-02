import Footer from '@/app/components/Footer/Footer';
import Header from '@/app/components/header/Header';
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <main className='flex flex-col min-h-screen items-center'>
            <Header />
            {children}
            <Footer />
        </main>
    );
};

export default Layout;
