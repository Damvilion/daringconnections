'use client';
import LiveKitGeneral from './components/LiveKit/LiveKitGeneral';
import { Button } from './components/shadCn/ui/button';

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between'>
            <div className='flex justify-between'>
                <div>Hello</div>
                <LiveKitGeneral />

                <Button variant='secondary'>Button</Button>
            </div>
        </main>
    );
}
