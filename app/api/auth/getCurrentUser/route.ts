import { prisma_db } from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    type Profile = {
        id: string;
        username: string;
        dareCoins: number;
        email?: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user: Profile = await request.json();

    const profile = await prisma_db.user.findUnique({
        where: {
            id: user.id,
        },
    });

    return NextResponse.json({ message: 'success', profile });
}
