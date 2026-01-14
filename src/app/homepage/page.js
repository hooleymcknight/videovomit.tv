import Link from 'next/link';
import Image from 'next/image';
import pageRoutes from '@/pageRoutes';
import areYouLive from '../api/twitch';
import getPlaylistItems from '../api/youtube';
import TwitchEmbed from '../components/TwitchEmbed/twitchEmbed';
import YouTubeEmbed from '../components/YouTubeEmbed/youTubeEmbed';
import '../globals.css';
import './homepage.css';

import { useSession } from "../SessionProvider";

let isLive = false;
let ytUploads;

/**
 * when you need client components in here, make those the child elements. import them into here.
 * the parent must be server.
 */

export default async function Home () {

    const liveStreams = await areYouLive();
    if (liveStreams.length) {
        isLive = liveStreams[0].type;
    }

    ytUploads = await getPlaylistItems('');
    
    console.log('TRUE UPLOADS')
    // console.log(ytUploads?.map(x => x.snippet.publishedAt));
    ytUploads?.sort((a, b) => b.snippet.publishedAt - a.snippet.publishedAt);
    // console.log(ytUploads?.map(x => x.snippet.publishedAt));
    

    return (
        <div className="flex min-h-screen items-center justify-center w-full">
            <main className="flex min-h-screen w-full max-w-[1200px] flex-col items-center justify-start py-32 px-16 sm:items-start">
                <TwitchEmbed live={isLive} />
                <YouTubeEmbed items={ytUploads} />
            </main>
        </div>
    );
}