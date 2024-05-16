import React from 'react';

const About = () => {
    return (
        <section>
            <h1 className='font-bold text-3xl text-center mt-10 text-[#a855f7]'>Daring Connections</h1>
            {/* <h2>What is Daring Connections?</h2> */}
            <p className='mt-2 text-center'>
                Daring Connections is a platform that connects people with similar interests and passions. It allows users to create profiles, join
                communities, and engage in meaningful conversations.
            </p>

            <div className='flex justify-center my-10 gap-2'>
                <img src='/about/girls/aigirl1.jpg' width={720} className='rounded-lg'></img>
                {/* <img src='/about/girls/aigirl2.png' width={720} className='rounded-lg'></img> */}
            </div>
        </section>
    );
};

export default About;
