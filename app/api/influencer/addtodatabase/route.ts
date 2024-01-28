import { NextResponse } from 'next/server';
import { redisClient } from '@/app/lib/redis';

export async function POST(request: Request) {
    interface BodyType {
        type: 'online' | 'offline';
        username: string;
    }
    // Get the socket ID from the request body
    const body: BodyType = await request.json();

    // Add the socket ID to the online_users set | this is to add the user to the matchmaking pool
    if (body.type === 'online') {
        try {
            await redisClient.sAdd('online_users', body.username);
            return NextResponse.json({ message: 'Success' });
        } catch (error) {
            console.error('Error adding ID to online_users set:', error);
            return NextResponse.json({ message: 'Failed', error, status: 400 });
        }
    } else if (body.type === 'offline') {
        try {
            await redisClient.sRem('online_users', body.username);
            return NextResponse.json({ message: 'Success' });
        } catch (error) {
            console.error('Error removing socket ID from online_users set:');
            return NextResponse.json({ message: 'Failed', error, status: 400 });
        }
    }
}
