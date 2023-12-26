import Footer from '@/app/components/Footer/Footer';
import NavBar from '@/app/components/NavBar/NavBar';
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <main className='flex flex-col min-h-screen items-center'>
            <NavBar />
            {children}
            <Footer />
        </main>
    );
};

export default Layout;
