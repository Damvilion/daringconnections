import { notFound } from 'next/navigation';

export default function Page({ params }: { params: { cam_girl: string } }) {
    if (params.cam_girl === 'not-found') {
        return notFound();
    }
    return <div>My Post: {params.cam_girl}</div>;
}
