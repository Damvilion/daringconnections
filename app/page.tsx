import LiveKitGeneral from './components/LiveKit/LiveKitGeneral';

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between'>
            <div className='flex justify-between'>
                <div>Hello</div>
                <LiveKitGeneral />
                <div>Hello</div>
            </div>
        </main>
    );
}
