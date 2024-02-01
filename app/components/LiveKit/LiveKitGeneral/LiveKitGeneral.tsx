'use client';
// import '@livekit/components-styles';
import React, { useState, useEffect } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import LiveKitGeneralRoom from './LiveKitGeneralRoom';
import { Button } from '@/app/components/shadCn/ui/button';
import axios, { AxiosResponse } from 'axios';
import { pusherClient } from '@/app/lib/pusher';

const LiveKitGeneral = () => {
    interface AxiosDataSet extends AxiosResponse {
        data: {
            allUsers: string[];
        };
    }

    const username = pusherClient.connection.socket_id;

    const [token, setToken] = useState('');

    const connectToLiveKit = async (room: string, username: string | number) => {
        try {
            const resp = await fetch(`/api/live-kit?room=${room}&username=${username}`);
            const data = await resp.json();
            setToken(data.token);
        } catch (e) {
            console.error(e);
        }
    };

    const FetchFromRedis = async () => {
        const res: AxiosDataSet = await axios.post('/api/live-kit/getOnlineInfluencer');
        if (res.status === 200) {
            const random = Math.floor(Math.random() * res.data.allUsers.length);
            const room = res.data.allUsers[random];

            return room;
        }
    };
    useEffect(() => {
        if (!username) return;

        FetchFromRedis().then((room) => {
            if (room) {
                connectToLiveKit(room, username);
            }
        });
    }, [username]);

    return (
        <LiveKitRoom
            video={false}
            audio={false}
            token={token}
            connect={true}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            // Use the default LiveKit theme for nice styles.
            // data-lk-theme='default'
            style={{ flexGrow: 1, width: '100vw' }}>
            <LiveKitGeneralRoom />
            <div className='flex justify-evenly w-full mt-1'>
                <Button className='ml-1 rounded-full bg-purple-500'>Prev</Button>
                <Button className='ml-1 rounded-full bg-purple-500'>Next</Button>
            </div>
        </LiveKitRoom>
    );
};

export default LiveKitGeneral;
