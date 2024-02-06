import { VideoTrack, useConnectionState, useParticipants, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { Loader2 } from 'lucide-react';
import React from 'react';

const LiveKitGeneralRoom = () => {
    const videoStream = useTracks([Track.Source.Camera]);
    const participants = useParticipants();
    const connectionState = useConnectionState();

    // const audioStream = useTracks([Track.Source.Microphone]);
    return (
        <div className='w-[100%] mt-3 mx-1 mr-auto ml-auto bg-black'>
            {!videoStream[0] && (
                <div className='flex justify-center relative'>
                    <video height={1080} width={1920} className='object-contain aspect-video'></video>
                    {connectionState === 'connecting' ||
                        ('disconnected' && (
                            <Loader2 className='text-white w-42 h-42 m-auto absolute left-0 right-0 top-0 bottom-0 animate-spin'>Hello</Loader2>
                        ))}
                </div>
            )}

            {videoStream[0] && (
                <div className='flex justify-center'>
                    <VideoTrack
                        height={1080}
                        width={1920}
                        trackRef={videoStream[0]}
                        className='max-w-full max-h-full object-contain aspect-video'></VideoTrack>
                </div>
            )}
            <div className='text-black bg-white text-xs text-right'>Current Viewers: {participants.length}</div>
        </div>
    );
};

export default LiveKitGeneralRoom;

{
    /* <div className='h-[300px] w-auto md:h-[500px] lg:h-[600px] rounded-sm object-cover bg-slate-700'>
<VideoTrack trackRef={videoStream[0]} className='w-full h-full rounded-sm object-cover'></VideoTrack>
</div> */
}
