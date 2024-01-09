'use client';
import LiveKitGeneral from './components/LiveKit/LiveKitGeneral/LiveKitGeneral';
import MainCard from '@/app/components/auth/customerCard/MainCard';
// import Header from './components/header/Header';

export default function Home() {
    return (
        <main className='h-screen relative'>
            {/* <Header /> */}
            <MainCard />
            <div className='flex h-full items-center justify-center'>
                <LiveKitGeneral />
            </div>
        </main>
    );
}
