'use client';
import '@livekit/components-styles';
import React, { useState, useEffect } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import LiveKitCamRoom from './LiveKitCamRoom';

interface LiveKitCamProps {
    room: string;
}
const LiveKitCam = ({ room }: LiveKitCamProps) => {
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
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            // Use the default LiveKit theme for nice styles.
            // data-lk-theme='default'
            style={{ height: '100dvh' }}>
            <LiveKitCamRoom room={room} />
        </LiveKitRoom>
    );
};

export default LiveKitCam;
