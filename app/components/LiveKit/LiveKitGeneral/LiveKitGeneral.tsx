import React, { useEffect } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Chatbox from '../../chatroom/Chatbox';
import { current_profile } from '@/app/lib/current-profile';
import { Profile } from '@/app/lib/types/types';
import LiveKitGeneralRoom from './LiveKitGeneralRoom';
import { jotai, liveKitConnection, current_user, liveKitRoom, liveKitDataToken } from '@/app/jotai_store/store';

const LiveKitGeneral = () => {
    const [connected, setConnected] = jotai.useAtom(liveKitConnection);
    const [room, setLiveKitRoom] = jotai.useAtom(liveKitRoom);
    const [user] = jotai.useAtom(current_user);
    const [dataToken, setDataToken] = jotai.useAtom(liveKitDataToken);
    const connectToLiveKit = async (room: string, username: string) => {
        try {
            const resp = await fetch(`/api/live-kit?room=${room}&username=${username}`);
            const data = await resp.json();
            setDataToken(data.token);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchRandomRoom = async () => {
        const response = await axios.post('/api/live-kit/getOnlineInfluencer');
        const allUsers = response.data.allUsers;
        const randomIndex = Math.floor(Math.random() * allUsers.length);
        const room = allUsers[randomIndex];
        setLiveKitRoom(room);
        return room;
    };

    useEffect(() => {
        const initializeLiveKit = async () => {
            const user = (await current_profile()) as Profile;
            const room = await fetchRandomRoom();

            if (room && user) {
                connectToLiveKit(room, user.username);
            } else if (room && !user) {
                const username = uuidv4();
                connectToLiveKit(room, username);
            }
        };

        initializeLiveKit();
    }, []);

    useEffect(() => {
        setConnected(false);
        connectToLiveKit(room, uuidv4()).then(() => setConnected(true));
    }, [user]);

    return (
        <div className='flex w-full flex-col items-center xl:flex-row lg:flex-row'>
            <LiveKitRoom video={false} audio={false} token={dataToken} connect={connected} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}>
                <LiveKitGeneralRoom />
            </LiveKitRoom>
            <Chatbox />
        </div>
    );
};

export default LiveKitGeneral;
