import React from 'react';
import { ScrollArea } from '../shadCn/ui/scroll-area';
import { Separator } from '../shadCn/ui/separator';
import { Input } from '../shadCn/ui/input';
import { Button } from '../shadCn/ui/button';

const Chatbox = () => {
    const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
    return (
        <div className='mr-auto ml-auto lg:mr-2 w-[80%] lg:w-auto my-2 px-14'>
            <ScrollArea className=' h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[70vh] rounded-md border my-2'>
                <div className='px-10 py-4'>
                    <h1 className='mb-4 font-bold leading-none text-xl text-center'>Welcome to my live chat room</h1>
                    <p className='text-sm text-center'>Type in the box to chat with me.</p>
                    <Separator className='my-2' />
                    <p className='text-xs text-center text-blue-600 mb-2'>
                        You must be at least <strong>18</strong> years old to join
                    </p>
                    {/* <p>Create a free account</p> */}
                    {tags.map((tag) => (
                        <div className='' key={tag}>
                            <div key={tag} className='text-left text-sm my-1'>
                                {tag}
                            </div>
                            <div key={tag + ' '} className='text-right text-sm my-1'>
                                {tag}
                            </div>
                            {/* <Separator className='my-2' /> */}
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className='flex gap-1'>
                <Input placeholder='Type Your Message Here' />
                <Button>Send</Button>
            </div>
        </div>
    );
};

export default Chatbox;
