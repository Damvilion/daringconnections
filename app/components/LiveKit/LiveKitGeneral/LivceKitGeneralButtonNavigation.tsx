import React, { useState } from 'react';
import { Button } from '../../shadCn/ui/button';
import { current_user, jotai, liveKitConnection, liveKitRoom } from '@/app/jotai_store/store';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const LivceKitGeneralButtonNavigation = () => {
    const [user] = jotai.useAtom(current_user);
    const [, setConnected] = jotai.useAtom(liveKitConnection);
    const [, setLiveKitRoom] = jotai.useAtom(liveKitRoom);
    const [, setToken] = useState('');

    const connectToLiveKit = async (room: string, username: string) => {
        try {
            const resp = await fetch(`/api/live-kit?room=${room}&username=${username}`);
            const data = await resp.json();
            setToken(data.token);
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

    const nextCam = async () => {
        setConnected(false);
        fetchRandomRoom().then((room) => {
            if (user) {
                connectToLiveKit(room, user.username).then(() => setConnected(true));
            } else if (!user) {
                const username = uuidv4();
                connectToLiveKit(room, username).then(() => setConnected(true));
            }
        });
    };
    return (
        <div className='flex justify-evenly w-full mb-3 absolute bottom-0'>
            <Button className='ml-1 rounded-full bg-purple-500' size='xs'>
                Prev
            </Button>
            <Button className='ml-1 rounded-full bg-purple-500' size='xs' onClick={nextCam}>
                Next
            </Button>
        </div>
    );
};

export default LivceKitGeneralButtonNavigation;
