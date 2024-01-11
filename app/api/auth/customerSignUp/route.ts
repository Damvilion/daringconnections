import { FirebaseAuth } from '@/app/firebase/firebase-config';
import { prisma_db } from '@/app/lib/prismadb';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NextResponse } from 'next/server';

interface BodyType {
    email: string;
    username: string;
    password: string;
    photoUrl?: string;
    uid?: string;
    type?: string;
}

export async function POST(request: Request) {
    const body: BodyType = await request.json();
    const { email, username, password, type, uid } = body;

    if (type === 'google') {
        try {
            const existingUser = await prisma_db.user.findFirst({
                where: {
                    email,
                },
            });

            if (!existingUser) {
                await prisma_db.user.create({ data: { username, email, id: uid } });
            }
            return NextResponse.json({ message: 'success' });
        } catch (error) {
            return NextResponse.json({ message: 'FAILED', error });
        }
    }
    // Check if email or username already exists
    try {
        const existingUser = await prisma_db.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            if (existingUser.email === email && existingUser.username === username) {
                console.log('Email & Username already exists');
                return NextResponse.json({ message: 'ISSUE', type: 'Email & Username already exists' });
            } else if (existingUser.email === email) {
                console.log('Email already exists');
                return NextResponse.json({ message: 'ISSUE', type: 'Email already exists' });
            } else if (existingUser.username === username) {
                console.log('Username already exists');
                return NextResponse.json({ message: 'ISSUE', type: 'Username already exists' });
            }
        }
    } catch (error) {
        return NextResponse.json({ message: 'FAILED', error });
    }
    // Creates User if User Signs in with Google

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
