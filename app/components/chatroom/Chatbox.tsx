import React from 'react';
import { ScrollArea } from '../shadCn/ui/scroll-area';
import { Separator } from '../shadCn/ui/separator';
import { Input } from '../shadCn/ui/input';
import { Button } from '../shadCn/ui/button';

const Chatbox = () => {
    const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
    return (
        <div className='mr-auto ml-auto w-[80%] lg:w-auto my-2'>
            <ScrollArea className='h-[200px] sm:h-[300px] md:h-[400px] rounded-md border px-10 my-2'>
                <div className='px-10 py-4'>
                    <h1 className='mb-4 font-bold leading-none text-lg text-center'>Welcome to my live chat room</h1>
                    <Separator className='my-2' />

                    {tags.map((tag) => (
                        <div className='' key={tag}>
                            <div key={tag} className='text-sm my-1'>
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
