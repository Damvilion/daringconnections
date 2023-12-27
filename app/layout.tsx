import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'DaringConnections - Free live adult cams',
    description: 'Watch and connect with live adult cam models. Free to watch, free to chat, free to broadcast.',
    keywords: 'adult cams, live cams, webcam models, adult chat, live streaming, free cams, adult entertainment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                {/* <NavBar /> */}
                {children}
                {/* <Footer /> */}
            </body>
        </html>
    );
}
