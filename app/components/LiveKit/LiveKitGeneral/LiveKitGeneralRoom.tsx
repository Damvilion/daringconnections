import { AudioTrack, VideoTrack, useConnectionState, useParticipants, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { Loader2 } from 'lucide-react';
import React from 'react';
import LivceKitGeneralButtonNavigation from './LivceKitGeneralButtonNavigation';

const LiveKitGeneralRoom = () => {
    const videoStreams = useTracks([Track.Source.Camera]);
    const participants = useParticipants();
    const connectionState = useConnectionState();

    const audioStream = useTracks([Track.Source.Microphone]);

    return (
        <div className='w-[100%] mt-3 mx-1 mr-auto ml-auto bg-black lg:rounded-md'>
            {audioStream[0] && <AudioTrack trackRef={audioStream[0]}></AudioTrack>}
            {!videoStreams[0] && (
                <div className='flex justify-center relative'>
                    <video height={1080} width={1920} className='object-contain aspect-video lg:min-w-[720px]'></video>
                    {connectionState === 'connecting' ||
                        ('disconnected' && (
                            // <Loader2 className='text-white w-42 h-42 m-auto absolute left-0 right-0 top-0 bottom-0 animate-spin'>Hello</Loader2>
                            <h1 className='text-white text-base flex justify-center items-center m-auto absolute left-0 right-0 top-0 bottom-0'>
                                No One is Online
                            </h1>
                        ))}
                    {connectionState === 'connecting' && (
                        <Loader2 className='text-white w-42 h-42 m-auto absolute left-0 right-0 top-0 bottom-0 animate-spin'></Loader2>
                    )}
                    <LivceKitGeneralButtonNavigation />
                </div>
            )}

            {videoStreams[0] && (
                <div className='flex justify-center relative'>
                    <VideoTrack
                        height={1080}
                        width={1920}
                        trackRef={videoStreams[0]}
                        controls={true}
                        playsInline={true}
                        className='object-contain aspect-video'></VideoTrack>
                    <LivceKitGeneralButtonNavigation />
                </div>
            )}

            {participants.length > 1 && (
                <div className='text-black bg-white text-xs text-right border-none'>Current Viewers: {participants.length}</div>
            )}
        </div>
    );
};

export default LiveKitGeneralRoom;

{
    /* <div className='h-[300px] w-auto md:h-[500px] lg:h-[600px] rounded-sm object-cover bg-slate-700'>
<VideoTrack trackRef={videoStream[0]} className='w-full h-full rounded-sm object-cover'></VideoTrack>
</div> */
}
