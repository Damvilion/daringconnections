import React from 'react';
import { Button } from '../../shadCn/ui/button';

const LivceKitGeneralButtonNavigation = () => {
    return (
        <div className='flex justify-evenly w-full mb-3 absolute bottom-0'>
            <Button className='ml-1 rounded-full bg-purple-500'>Prev</Button>
            <Button className='ml-1 rounded-full bg-purple-500'>Next</Button>
        </div>
    );
};

export default LivceKitGeneralButtonNavigation;
