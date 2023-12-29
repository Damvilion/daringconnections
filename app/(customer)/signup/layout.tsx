'use client';
import React from 'react';
import { NextUIProvider } from '@nextui-org/react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <NextUIProvider>
            <main className='flex flex-col min-h-screen items-center justify-center'>{children}</main>
        </NextUIProvider>
    );
};

export default Layout;
