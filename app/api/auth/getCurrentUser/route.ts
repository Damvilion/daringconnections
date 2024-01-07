import { prisma_db } from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const user = await request.json();

    const profile = await prisma_db.user.findUnique({
        where: {
            id: user.uid,
        },
    });

    return NextResponse.json({ message: 'success', profile });
}
