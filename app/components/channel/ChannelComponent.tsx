'use client';
import React, { useEffect, useState } from 'react';
import { LiveKitRoom, useConnectionState, useLocalParticipant, useParticipants } from '@livekit/components-react';
import { LocalAudioTrack, LocalVideoTrack, RemoteParticipant, Track } from 'livekit-client';
import { current_user, jotai, liveKitConnection, microphoneConnection } from '@/app/jotai_store/store';
import { current_profile } from '@/app/lib/current-profile';
import { useRouter } from 'next/navigation';
import { Profile } from '@/app/lib/types/types';
import ChannelChatbox from './ChannelChatbox';
import axios from 'axios';
import ChannelLiveOptions from './channelFooter/ChannelLiveOptions';

const ChannelComponent: React.FC = () => {
    const router = useRouter();
    const [, setUser] = jotai.useAtom(current_user);
    const [connected] = jotai.useAtom(liveKitConnection);
    const [mic] = jotai.useAtom(microphoneConnection);
    const [token, setToken] = useState('');

    const connectToLiveKit = async (username: string) => {
        try {
            const resp = await fetch(`/api/live-kit?room=${username}&username=${username}`);
            const data = await resp.json();
            setToken(data.token);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        const getProfile = async () => {
            const fetchedUser: Profile = (await current_profile()) as Profile;
            if (!fetchedUser) {
                router.push('/login');
            } else {
                setUser(fetchedUser as Profile | null);
                connectToLiveKit(fetchedUser.username);
            }
        };
        getProfile();
    }, []);

    return (
        <LiveKitRoom
            video={false}
            audio={mic}
            token={token}
            connect={connected}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            // style={{ height: '100vh' }}
            style={{ width: '100vw', height: '100vh' }}>
            <LiveRoom />
        </LiveKitRoom>
    );
};

const LiveRoom = () => {
    const [currentUser] = jotai.useAtom(current_user);
    const localParticipant = useLocalParticipant();

    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [connected, setConnected] = jotai.useAtom(liveKitConnection);
    const [disabled, setDisabled] = useState(true);

    const connectionState = useConnectionState();

    const publishVideo = async (res: MediaStream) => {
        if (connectionState !== 'connected') return;
        try {
            const localVideoTrack = new LocalVideoTrack(res!.getVideoTracks()[0], { aspectRatio: 16 / 9, height: 720, width: 1280 });
            await localParticipant.localParticipant.publishTrack(localVideoTrack, { source: Track.Source.Camera });
        } catch (e) {
            console.error(e);
        }
    };
    const publishAudio = async (res: MediaStream) => {
        if (connectionState !== 'connected') return;
        try {
            const localAudioTrack = new LocalAudioTrack(res!.getAudioTracks()[0]);
            await localParticipant.localParticipant.publishTrack(localAudioTrack, { source: Track.Source.Microphone });
        } catch (e) {
            console.error(e);
        }
    };

    const asignMedia = (mediaSteam: MediaStream | null) => {
        videoRef.current!.srcObject = mediaSteam;
    };

    const connectToLiveKit = () => {
        if (connected) {
            setConnected(false);
        } else if (!connected) {
            setConnected(true);
        }
    };
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

    const getVideo = async () => {
        try {
            const res = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

            if (res) {
                setVideoStream(res);
                return res;
            }
        } catch (e) {
            console.error(e);
        }
    };

    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

    const getAudio = async () => {
        try {
            const res = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (res) {
                setAudioStream(res);
                return res;
            }
        } catch (e) {
            console.error(e);
        }
    };

    const toggleWebcam = async () => {
        if (connectionState !== 'connected') {
            if (videoStream) {
                setVideoStream(null);
            } else {
                getVideo();
            }

            return;
        }
        if (localParticipant.localParticipant.isCameraEnabled) {
            localParticipant.localParticipant.setCameraEnabled(false);
            setVideoStream(null);
        } else {
            localParticipant.localParticipant.setCameraEnabled(true);
            getVideo();
        }
    };

    const toggleMic = async () => {
        if (connectionState !== 'connected') {
            if (audioStream) {
                setAudioStream(null);
            } else {
                getAudio();
            }
            return;
        }
        if (localParticipant.localParticipant.isMicrophoneEnabled) {
            localParticipant.localParticipant.setMicrophoneEnabled(false);
            setAudioStream(null);
        } else {
            localParticipant.localParticipant.setMicrophoneEnabled(true);
            getAudio();
        }
    };

    const updateDatabase = async (type: string, username: string | undefined) => {
        if (type === 'online') {
            await axios.post('/api/influencer/addtodatabase', {
                type: 'online',
                username: username,
            });
        } else if (type === 'offline') {
            await axios.post('/api/influencer/addtodatabase', {
                type: 'offline',
                username: username,
            });
        }
    };

    useEffect(() => {
        if (connectionState === 'connected') {
            if (videoStream) {
                publishVideo(videoStream);
            }
            if (audioStream) {
                publishAudio(audioStream);
            }
            updateDatabase('online', currentUser?.username);
            // Push to redis database
        } else if (connectionState === 'disconnected') {
            getVideo();
            getAudio();

            updateDatabase('offline', currentUser?.username);
        }
    }, [connectionState]);

    useEffect(() => {
        getVideo();
        getAudio();

        setTimeout(() => {
            setDisabled(false);
        }, 3000);
    }, []);

    useEffect(() => {
        asignMedia(videoStream);
    }, [videoStream]);

    const participants = useParticipants();
    return (
        <div className='mx-1 flex flex-col items-center md:flex-row h-[80%] '>
            <div className='flex-grow h-full bg-red-500 flex flex-col'>
                <div className='flex flex-grow justify-center bg-slate-600 rounded-lg'>
                    <video
                        width={1280}
                        height={720}
                        ref={videoRef}
                        autoFocus={false}
                        controls={false}
                        muted
                        autoPlay
                        playsInline
                        className='object-contain aspect-video'>
                        <source />
                    </video>
                </div>

                <div className='flex justify-center gap-2 items-center p-1 bg-slate-500'>
                    <ChannelLiveOptions
                        audioStream={audioStream}
                        connectToLiveKit={connectToLiveKit}
                        connectionState={connectionState}
                        toggleMic={toggleMic}
                        toggleWebcam={toggleWebcam}
                        videoStream={videoStream}
                        disabled={disabled}
                    />
                </div>
            </div>

            <ChannelChatbox participants={participants as RemoteParticipant[]} />
        </div>
    );
};

export default ChannelComponent;
