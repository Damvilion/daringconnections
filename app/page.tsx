'use client';
import LiveKitGeneral from './components/LiveKit/LiveKitGeneral/LiveKitGeneral';
import MainCard from '@/app/components/auth/customerCard/MainCard';
import Header from './components/header/Header';

export default function Home() {
    return (
        <main className='h-screen'>
            <Header />
            <div className='relative'>
                <MainCard />
                <div className='flex items-center justify-center'>
                    <LiveKitGeneral />
                </div>
            </div>
        </main>
    );
}
