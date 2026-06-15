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

// let isLive = false;
// let reauthorizing = false;
// let oauthCode;
// let ytUploads;

/**
 * when you need client components in here, make those the child elements. import them into here.
 * the parent must be server.
 */

export default async function Home ({ searchParams }) {
    // const params = await searchParams;
    // if (params.code && params.scope) { // twitch would send us with all of these
    //     oauthCode = params.code;
    // }

    // let liveStreams = await areYouLive(oauthCode);
    // if (liveStreams === 'retry') {
    //     liveStreams = await areYouLive(oauthCode);
    // }
    // else if (liveStreams?.clientId) {
    //     console.log('reauth')
    //     reauthorizing = liveStreams.clientId;
    // }
    // else if (liveStreams?.length) {
    //     isLive = liveStreams[0].type;
    // }
    // else {
    //     reauthorizing = false;
    // }

    // ytUploads = await getPlaylistItems();
    const PLAYLIST_ID = 'PLCLLPATZiHLn4-YUCYnHNNsAUxOiMhKoP';
    const allowList = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

    return (
        <div className="flex min-h-screen items-center justify-center w-full">
            <main className="flex min-h-screen w-full max-w-[1200px] flex-col items-center justify-start py-32 px-16 sm:items-start">
                {/* <TwitchEmbed live={isLive} reauth={reauthorizing} />
                <YouTubeEmbed items={ytUploads.data} /> */}
                {/* <iframe width="720" height="405" src={`https://www.youtube.com/embed/playlist?list=${PLAYLIST_ID}`} frameBorder="0" allowFullScreen allow={allowList} /> */}
            </main>
        </div>
    );
}