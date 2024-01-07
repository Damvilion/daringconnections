import { FirebaseAuth } from '@/app/firebase/firebase-config';
import { prisma_db } from '@/app/lib/prismadb';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NextResponse } from 'next/server';

interface BodyType {
    email: string;
    username: string;
    password: string;
}

export async function POST(request: Request) {
    const body: BodyType = await request.json();
    const { email, username, password } = body;

    // Check if email or username already exists
    try {
        const existingUser = await prisma_db.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            if (existingUser.email === email && existingUser.username === username) {
                return NextResponse.json({ message: 'ISSUE', type: 'Email & Username already exists' });
            } else if (existingUser.email === email) {
                return NextResponse.json({ message: 'ISSUE', type: 'Email already exists' });
            } else if (existingUser.username === username) {
                return NextResponse.json({ message: 'ISSUE', type: 'Username already exists' });
            }
        }
    } catch (error) {
        return NextResponse.json({ message: 'FAILED' });
    }

    try {
        const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        if (res.user) {
            await prisma_db.user.create({ data: { username, email, id: res.user.uid } });
        }
    } catch (error) {
        return NextResponse.json({ message: 'FAILED' });
    }

    return NextResponse.json({ message: 'success' });
}