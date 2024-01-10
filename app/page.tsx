'use client';
import LiveKitGeneral from './components/LiveKit/LiveKitGeneral/LiveKitGeneral';
import MainCard from '@/app/components/auth/customerCard/MainCard';
import Header from './components/header/Header';
import Chatbox from './components/chatroom/Chatbox';

export default function Home() {
    return (
        <main>
            <Header />
            <div className='flex flex-col gap-1 lg:flex-row items-center justify-between'>
                <MainCard />
                <LiveKitGeneral />
                <Chatbox />
            </div>
        </main>
    );
}
