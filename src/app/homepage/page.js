import Link from 'next/link';
import Image from 'next/image';
import pageRoutes from '@/pageRoutes';
import { useSession } from '../SessionProvider';
import areYouLive from '../api/twitch';
import TwitchEmbed from '../components/TwitchEmbed/twitchEmbed';
import '../globals.css';
import './homepage.css';

let isLive = false;

/**
 * when you need client components in here, make those the child elements. import them into here.
 * the parent must be server.
 */

export default async function Home () {
    // const session = useSession();
    // const displayName = session?.sessionData?.user?.username;

    const liveStreams = await areYouLive();
    // console.log(liveStreams);
    if (liveStreams.length) {
        isLive = liveStreams[0].type;
    }

    return (
        <div className="flex min-h-screen items-center justify-center w-full">
            <main className="flex min-h-screen w-full max-w-[1200px] flex-col items-center justify-start py-32 px-16 sm:items-start">
                <TwitchEmbed live={isLive} />
            </main>
        </div>
    );
}