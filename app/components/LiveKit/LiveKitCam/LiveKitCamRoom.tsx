import React from 'react';

interface LiveKitCamRoomProps {
    room: string;
}
const LiveKitCamRoom = ({ room }: LiveKitCamRoomProps) => {
    console.log('room', room);
    return (
        <main className='w-full flex flex-col items-center p-5 px-7'>
            <div className='flex justify-center relative'>
                <video height={720} width={1280} className='object-contain aspect-video bg-black rounded-md'></video>
            </div>
        </main>
    );
};

export default LiveKitCamRoom;
