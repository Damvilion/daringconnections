import Link from 'next/link';
import Header from '@/app/components/header/Header';

export default function NotFound() {
    return (
        <div>
            <Header />
            <div className='flex flex-col items-center h-screen gap-5'>
                <h1 className='text-2xl font-bold'>Page Not Found</h1>
                <p>Page does not exist</p>
                <Link className='bg-purple-300 p-3 rounded-lg' href='/'>
                    Return Home
                </Link>
            </div>
        </div>
    );
}
