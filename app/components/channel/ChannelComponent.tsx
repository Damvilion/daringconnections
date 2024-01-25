'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../shadCn/ui/button';
import { LiveKitRoom, useLocalParticipant, useTracks } from '@livekit/components-react';
import { LocalAudioTrack, LocalVideoTrack, Track } from 'livekit-client';
import { current_user, jotai, liveKitConnection, microphoneConnection } from '@/app/jotai_store/store';
import { current_profile } from '@/app/lib/current-profile';
import { useRouter } from 'next/navigation';
import { Profile } from '@/app/lib/types/types';
import ChannelChatbox from './ChannelChatbox';

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
    const localParticipant = useLocalParticipant();
    const [mediaSteam, setMediaStream] = useState<MediaStream | null>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [connected, setConnected] = jotai.useAtom(liveKitConnection);
    const [disabled, setDisabled] = useState(true);

    const asignMedia = (mediaSteam: MediaStream) => {
        videoRef.current!.srcObject = mediaSteam;
    };

    const turnOnWebcam = async () => {
        if (mediaSteam) return;
        getMedia().then(() => {
            publishVideoTrack(mediaSteam!);
        });
    };

    const turnOnMic = async () => {
        if (audioStream) return;
        getAudio().then(() => {
            publishAudioTrack(audioStream!);
        });
    };
    const unPublushVideoTrack = async () => {
        if (!connected && mediaSteam) {
            setMediaStream(null);
            return;
        }
        if (!mediaSteam) return;
        try {
            await localParticipant.localParticipant.unpublishTrack(mediaSteam!.getVideoTracks()[0]);
            setMediaStream(null);
        } catch (e) {
            console.error(e);
        }
    };

    const publishVideoTrack = async (res: MediaStream) => {
        if (!res) return;
        try {
            const localVideoTrack = new LocalVideoTrack(res!.getVideoTracks()[0]);
            await localParticipant.localParticipant.publishTrack(localVideoTrack, { source: Track.Source.Camera });
        } catch (e) {
            console.error(e);
        }
    };

    const publishAudioTrack = async (res: MediaStream) => {
        if (!res) return;
        try {
            const localAudioTrack = new LocalAudioTrack(res!.getAudioTracks()[0]);
            await localParticipant.localParticipant.publishTrack(localAudioTrack, { source: Track.Source.Microphone });
        } catch (e) {
            console.error(e);
        }
    };

    const unPublishAudioTrack = async () => {
        if (!connected && audioStream) {
            setAudioStream(null);
            return;
        }
        if (!audioStream) return;
        try {
            await localParticipant.localParticipant.unpublishTrack(audioStream!.getAudioTracks()[0]);
            setAudioStream(null);
        } catch (e) {
            console.error(e);
        }
    };

    const connectToLiveKit = () => {
        if (connected && mediaSteam) {
            setConnected(false);
            getMedia();
            return;
        } else if (connected && !mediaSteam) {
            setConnected(false);
            return;
        }
        setConnected(true);
    };

    const getMedia = async () => {
        try {
            const res = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            if (res) {
                setMediaStream(res);
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
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getMedia();
        getAudio();

        setTimeout(() => {
            setDisabled(false);
        }, 3000);
    }, []);

    useEffect(() => {
        asignMedia(mediaSteam!);
    }, [mediaSteam]);

    const videoTrack = useTracks([Track.Source.Camera]);
    const audioTrack = useTracks([Track.Source.Microphone]);

    useEffect(() => {
        if (connected) {
            setTimeout(() => {
                if (videoTrack.length < 1) {
                    publishVideoTrack(mediaSteam!);
                }
                if (audioTrack.length < 1) {
                    publishAudioTrack(audioStream!);
                }
            }, 1000);
        }
    }, [mediaSteam, audioStream, connected]);

    // const tracks = useTracks();
    // const logTracks = () => {
    //     console.log(tracks);
    // };

    const toggleWebcam = () => {
        if (mediaSteam) {
            unPublushVideoTrack();
        } else if (!mediaSteam) {
            turnOnWebcam();
        }
    };

    const toggleMicrophone = () => {
        if (audioStream) {
            unPublishAudioTrack();
        } else if (!audioStream) {
            turnOnMic();
        }
    };

    return (
        <div className='h-full'>
            <div className='mx-1 flex flex-col items-center md:flex-row'>
                <div className='flex-grow'>
                    <video ref={videoRef} autoFocus={false} controls={false} muted autoPlay playsInline className='bg-slate-600 w-full'></video>

                    <div className='flex justify-center gap-2 items-center p-1 bg-slate-500'>
                        <div className='cursor-pointer' onClick={toggleWebcam}>
                            {/* <img src='/assets/ifluencer_cam_icons/camerablack.png' alt='camera logo' className='w-8' /> */}

                            {!mediaSteam && <img src='/assets/ifluencer_cam_icons/camerared.png' alt='camera logo' className='w-8' />}
                            {mediaSteam && <img src='/assets/ifluencer_cam_icons/camerawhite.png' alt='camera logo' className='w-8' />}
                        </div>
                        <div className='cursor-pointer' onClick={toggleMicrophone}>
                            {!audioStream && <img src='/assets/ifluencer_cam_icons/micred.png' alt='camera logo' className='w-8' />}
                            {audioStream && <img src='/assets/ifluencer_cam_icons/micwhite.png' alt='camera logo' className='w-8' />}
                        </div>

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
