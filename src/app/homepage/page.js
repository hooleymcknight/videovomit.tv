// import Link from 'next/link';
// import Image from 'next/image';
// import pageRoutes from '@/pageRoutes'; // give it a minute, I'm sure we'll need these.
import { areYouLive } from '../api/twitch';
import getPlaylistItems from '../api/youtube';
import TwitchEmbed from '../components/TwitchEmbed/twitchEmbed';
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

    return (
        <>
            <TwitchEmbed live={!!isLive.length} />

            <YtCarousel items={ytUploads} />
        </>
    );
}