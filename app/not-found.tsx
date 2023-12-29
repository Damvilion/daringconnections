// import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='flex flex-col items-center'>
            <h2>Page Not Found</h2>
            <p>Could not find requested resource</p>
            <Link className='bg-blue-300 p-3 rounded-lg' href='/'>
                Return Home
            </Link>
        </div>
    );
}
