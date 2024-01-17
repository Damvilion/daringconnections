import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const body = await request.json();
    return NextResponse.json({ message: 'success' });
}
