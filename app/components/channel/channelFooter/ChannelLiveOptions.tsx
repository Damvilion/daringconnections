import React from 'react';
import { Button } from '../../shadCn/ui/button';
import { ConnectionState } from 'livekit-client';
import { Loader2 } from 'lucide-react';

interface ChannelLiveOptionsProps {
    audioStream: MediaStream | null;
    videoStream: MediaStream | null;
    disabled: boolean;
    toggleMic: () => void;
    toggleWebcam: () => void;
    connectToLiveKit: () => void;
    connectionState: ConnectionState;
}

const ChannelLiveOptions = ({
    audioStream,
    videoStream,
    connectionState,
    disabled,
    toggleMic,
    toggleWebcam,
    connectToLiveKit,
}: ChannelLiveOptionsProps) => {
    return (
        <footer className='w-full'>
            <div className='flex justify-center gap-2 items-center p-1 bg-slate-500'>
                <Button onClick={toggleWebcam}>
                    {!videoStream && <img src='/assets/ifluencer_cam_icons/camerared.png' alt='camera logo' className='w-8' />}
                    {videoStream && <img src='/assets/ifluencer_cam_icons/camerawhite.png' alt='camera logo' className='w-8' />}
                </Button>

                <Button onClick={toggleMic}>
                    {!audioStream && <img src='/assets/ifluencer_cam_icons/micred.png' alt='camera logo' className='w-8' />}
                    {audioStream && <img src='/assets/ifluencer_cam_icons/micwhite.png' alt='camera logo' className='w-8' />}
                </Button>

                <Button onClick={connectToLiveKit} disabled={disabled} variant={connectionState === 'connected' ? 'destructive' : 'secondary'}>
                    {connectionState === 'disconnected' && <p>Go Live</p>}
                    {connectionState === 'connected' && <p>End Live</p>}
                    {connectionState === 'connecting' && (
                        <div className='flex items-center gap-1'>
                            <Loader2 className='animate-spin' />
                            Connecting...
                        </div>
                    )}
                </Button>
            </div>
        </footer>
    );
};

export default ChannelLiveOptions;
