import { createClient } from 'redis';

const client = createClient({
    password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
    socket: {
        host: process.env.NEXT_PUBLIC_REDIS_HOST,
        port: process.env.NEXT_PUBLIC_REDIS_PORT as unknown as number,
    },
});

client.on('error', (error) => {
    console.error(error);
});

if (!client.isOpen) {
    client.connect();
}

export { client as redisClient };
