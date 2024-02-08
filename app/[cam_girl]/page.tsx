import React from 'react';
import { notFound } from 'next/navigation';
import LiveKitCam from '@/app/components/LiveKit/LiveKitCam/LiveKitCam';

export default function Page({ params }: { params: { cam_girl: string } }) {
    // Create Live Kit room with the room name being params.cam_girl and the user name to be the pusher connection or whatever you choose
    if (params.cam_girl === 'not-found') {
        return notFound();
    }
    const room = params.cam_girl;

    console.log('room', room);

    return <LiveKitCam room={room} />;
}
