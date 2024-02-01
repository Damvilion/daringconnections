import { VideoTrack, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import React from 'react';

const LiveKitGeneralRoom = () => {
    const videoStream = useTracks([Track.Source.Camera]);
    // const audioStream = useTracks([Track.Source.Microphone]);
    return (
        <div className='w-[100%] mt-3 mx-1 mr-auto ml-auto bg-black'>
            {!videoStream[0] && (
                <div className=''>
                    <video height={720} width={1280} className='object-contain aspect-video'></video>
                </div>
            )}

            {videoStream[0] && (
                <div className='h-[300px] w-auto md:h-[500px] lg:h-[600px] rounded-sm object-cover bg-slate-700'>
                    <VideoTrack trackRef={videoStream[0]} className='w-full h-full rounded-sm object-cover'></VideoTrack>
                </div>
            )}
        </div>
    );
};

export default LiveKitGeneralRoom;
