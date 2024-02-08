import Link from 'next/link';

export default function NotFound() {
    return (
        <div>
            <div className='flex flex-col items-center h-screen gap-5'>
                <h1 className='text-2xl font-bold'>Cam Girl was Not Found</h1>

                <Link className='bg-purple-300 p-3 rounded-lg' href='/'>
                    Return Home
                </Link>
            </div>
        </div>
    );
}
