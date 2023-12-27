import { notFound } from 'next/navigation';

export default function Page({ params }: { params: { cam_girl: string } }) {
    // Create Live Kit room with the room name being params.cam_girl and the user name to be the pusher connection or whatever you choose
    if (params.cam_girl === 'not-found') {
        return notFound();
    }

    return <div>My Post: {params.cam_girl}</div>;
}
