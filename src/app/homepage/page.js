// import Link from 'next/link';
// import Image from 'next/image';
// import pageRoutes from '@/pageRoutes'; // give it a minute, I'm sure we'll need these.
import { areYouLive } from '../api/twitch';
import getPlaylistItems from '../api/youtube';
import TwitchEmbed from '../components/TwitchEmbed/twitchEmbed';
import YouTubeEmbed from '../components/YouTubeEmbed/youTubeEmbed';
import YtCarousel from '../components/YtCarousel/YtCarousel';

let isLive = false;
let ytUploads;

/**
 * when you need client components in here, make those the child elements. import them into here.
 * the parent must be server.
 */

export default async function Home () {

    // there might be amore appropriate way to be calling these.
    isLive = await areYouLive();
    ytUploads = await getPlaylistItems();

    // const PLAYLIST_ID = 'PLCLLPATZiHLn4-YUCYnHNNsAUxOiMhKoP';
    // const allowList = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    // again, unused but I'm leaving them here for now. there are decisions to be made before I go deletin'

    return (
        <>
            <TwitchEmbed live={!!isLive.length} />
            {/* <YouTubeEmbed items={ytUploads} /> */}
            {/* <iframe width="720" height="405" src={`https://www.youtube.com/embed/playlist?list=${PLAYLIST_ID}`} frameBorder="0" allowFullScreen allow={allowList} /> */}

            <YtCarousel items={ytUploads} />
        </>
    );
}