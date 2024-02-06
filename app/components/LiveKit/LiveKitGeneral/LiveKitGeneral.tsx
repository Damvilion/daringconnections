'use client';
// import '@livekit/components-styles';
import React, { useState, useEffect, useMemo } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import LiveKitGeneralRoom from './LiveKitGeneralRoom';
import axios, { AxiosResponse } from 'axios';
// import { pusherClient } from '@/app/lib/pusher';

import { v4 as uuidv4 } from 'uuid';
import Chatbox from '../../chatroom/Chatbox';

const LiveKitGeneral = () => {
    interface AxiosDataSet extends AxiosResponse {
        data: {
            allUsers: string[];
        };
    }

    const username = useMemo(() => uuidv4(), []);

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
        <div className='flex w-full flex-col items-center lg:flex-row'>
            <LiveKitRoom
                video={false}
                audio={false}
                token={token}
                connect={true}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
                // Use the default LiveKit theme for nice styles.
                // data-lk-theme='default'
                // style={{ flexGrow: 1, width: '' }}
            >
                <LiveKitGeneralRoom />
            </LiveKitRoom>
            <Chatbox />
        </div>
    );
};

export default LiveKitGeneral;
