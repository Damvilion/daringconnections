'use client';
import LiveKitGeneral from './components/LiveKit/LiveKitGeneral/LiveKitGeneral';
// import MainCard from './components/auth/customerCard/MainCard';

export default function Home() {
    return (
        <main className='h-screen'>
            <div className='flex h-full items-center justify-center'>
                <LiveKitGeneral />
            </div>
            {/* <MainCard /> */}
        </main>
    );
}
