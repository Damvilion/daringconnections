'use client';
// import '@livekit/components-styles';
import React, { useState, useEffect } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import LiveKitGeneralRoom from './LiveKitGeneralRoom';
import { Button } from '@/app/components/shadCn/ui/button';

const LiveKitGeneral = () => {
    // Fetched from redis
    const room = '';

    const username = '';
    const [token, setToken] = useState('');
    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch(`/api/live-kit?room=${room}&username=${username}`);
                const data = await resp.json();
                setToken(data.token);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);
    return (
        <LiveKitRoom
            video={false}
            audio={false}
            token={token}
            connect={false}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            // Use the default LiveKit theme for nice styles.
            // data-lk-theme='default'
            // style={{ height: '100dvh' }}
        >
            <LiveKitGeneralRoom />
            <div className='flex justify-evenly w-full mt-1'>
                <Button className='ml-1 rounded-full bg-purple-500'>Prev</Button>
                <Button className='ml-1 rounded-full bg-purple-500'>Next</Button>
            </div>
        </LiveKitRoom>
    );
};

export default LiveKitGeneral;
