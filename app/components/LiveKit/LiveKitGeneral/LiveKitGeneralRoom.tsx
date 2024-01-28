import { VideoTrack, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import React from 'react';

const LiveKitGeneralRoom = () => {
    const videoStream = useTracks([Track.Source.Camera]);
    // const audioStream = useTracks([Track.Source.Microphone]);
    return (
        <div className='w-[100%] mt-3 mx-1 mr-auto ml-auto'>
            {!videoStream[0] && <video className='bg-slate-700 h-[300px] md:h-[500px] lg:h-[600px] rounded-sm'></video>}

            {videoStream[0] && <VideoTrack trackRef={videoStream[0]} className='h-[300px] md:h-[500px] lg:h-[600px] rounded-sm'></VideoTrack>}
        </div>
    );
};

export default LiveKitGeneralRoom;
