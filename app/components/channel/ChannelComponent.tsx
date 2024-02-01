'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../shadCn/ui/button';
import { LiveKitRoom, useConnectionState, useLocalParticipant } from '@livekit/components-react';
import { LocalAudioTrack, LocalVideoTrack, Track } from 'livekit-client';
import { current_user, jotai, liveKitConnection, microphoneConnection } from '@/app/jotai_store/store';
import { current_profile } from '@/app/lib/current-profile';
import { useRouter } from 'next/navigation';
import { Profile } from '@/app/lib/types/types';
import ChannelChatbox from './ChannelChatbox';
import axios from 'axios';

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
            style={{ height: '100vh' }}>
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

    const asignMedia = (mediaSteam: MediaStream) => {
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
            const res = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
            if (res) {
                setAudioStream(res);
                return res;
            }
        } catch (e) {
            console.error(e);
        }
    };
    const unPublishAudio = async () => {
        if (connectionState !== 'connected') return;
        try {
            await localParticipant.localParticipant.unpublishTrack(audioStream!.getAudioTracks()[0]);
            setAudioStream(null);
        } catch (e) {
            console.error(e);
        }
    };
    const unPublishVideo = async () => {
        if (connectionState !== 'connected') return;
        try {
            await localParticipant.localParticipant.unpublishTrack(videoStream!.getVideoTracks()[0]);
            setVideoStream(null);
        } catch (e) {
            console.error(e);
        }
    };

    const toggleWebcam = async () => {
        if (videoStream) {
            unPublishVideo();
            setVideoStream(null);
        } else if (!videoStream) {
            getVideo().then((res: MediaStream | undefined) => {
                if (!res) return;
                publishVideo(res);
            });
        }
    };

    const toggleMic = async () => {
        if (audioStream) {
            unPublishAudio();
            setAudioStream(null);
        } else if (!audioStream) {
            getAudio().then((res: MediaStream | undefined) => {
                if (!res) return;
                publishAudio(res);
            });
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
        asignMedia(videoStream!);
    }, [videoStream]);

    // Disables the buttons for 1 second after toggling to discourage spamming
    const [disabledMic, setDisabledMic] = useState(false);
    const [disabledCam, setDisabledCam] = useState(false);

    useEffect(() => {
        setDisabledMic(true);
        setDisabledCam(true);

        setTimeout(() => {
            setDisabledMic(false);
            setDisabledCam(false);
        }, 1000);
    }, [videoStream, audioStream]);
    return (
        <div>
            <div className='mx-1 flex flex-col items-center md:flex-row'>
                <div className='flex-grow'>
                    <video ref={videoRef} autoFocus={false} controls={false} muted autoPlay playsInline className='bg-slate-600 w-full'></video>

                    <div className='flex justify-center gap-2 items-center p-1 bg-slate-500'>
                        <Button onClick={toggleWebcam} disabled={disabledCam}>
                            {!videoStream && <img src='/assets/ifluencer_cam_icons/camerared.png' alt='camera logo' className='w-8' />}
                            {videoStream && <img src='/assets/ifluencer_cam_icons/camerawhite.png' alt='camera logo' className='w-8' />}
                        </Button>

                        <Button onClick={toggleMic} disabled={disabledMic}>
                            {!audioStream && <img src='/assets/ifluencer_cam_icons/micred.png' alt='camera logo' className='w-8' />}
                            {audioStream && <img src='/assets/ifluencer_cam_icons/micwhite.png' alt='camera logo' className='w-8' />}
                        </Button>

                        <Button onClick={connectToLiveKit} disabled={disabled} variant={connected ? 'destructive' : 'secondary'}>
                            {!connected && <p>Go Live</p>}
                            {connected && <p>End Live</p>}
                        </Button>
                    </div>
                </div>

                <ChannelChatbox />
            </div>
        </div>
    );
};

export default ChannelComponent;
