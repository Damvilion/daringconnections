import { NextResponse } from 'next/server';
import { BodyType } from '../customerSignUp/route';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuth } from '@/firebase/firebase-config';
import { prisma_db } from '@/app/lib/prismadb';

export async function POST(request: Request) {
    interface InfluencerBodyType extends BodyType {
        name: string;
    }
    const body: InfluencerBodyType = await request.json();
    const { email, username, password, name } = body;

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
        return NextResponse.json({ message: 'FAILED', error });
    }

    try {
        const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        if (res.user) {
            const createdUser = await prisma_db.user.create({ data: { username, email, id: res.user.uid, isCamUser: true } });
            await prisma_db.camUser.create({
                data: {
                    id: res.user.uid,
                    username: username,
                    email,
                    name,
                    userProfile: { connect: { id: createdUser.id } },
                },
            });
        }
    } catch (error) {
        return NextResponse.json({ message: 'FAILED' });
    }

    return NextResponse.json({ message: 'SUCCESS' });
}
