import React from 'react';
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <main className='flex flex-col min-h-screen items-center'>{children}</main>;
};

export default Layout;
