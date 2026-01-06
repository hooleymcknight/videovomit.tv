'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import pageRoutes from '@/pageRoutes';
import { useSession } from '../SessionProvider';
// import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import '../globals.css';
import './homepage.css';

// Source - https://stackoverflow.com/a
// Posted by Cookie
// Retrieved 2026-01-04, License - CC BY-SA 4.0

async function checkIfLive(username) {
    try {
        const response = await fetch(`https://twitch.tv/${username}`);
        const sourceCode = await response.text();
        console.log(response);

        if (sourceCode.includes("isLiveBroadcast")) {
            console.log(`${username} is live`);
            return true;
        }
        else {
            console.log(`${username} is not live`);
            return false;
        }
    }
    catch (error) {
        console.log("Error occurred:", error);
        return null;
    }
}

const embedTwitch = () => {
    if (!document.querySelectorAll('#twitch-embed')) {
        setTimeout(embedTwitch, 100);
        return;
    }
    
    if (!document.querySelectorAll('#twitch-embed *').length) {
        new Twitch.Embed("twitch-embed", {
            width: 854,
            height: 480,
            channel: "videovomit",
            // Only needed if this page is going to be embedded on other websites
            parent: ["videovomit.tv"]
        });
    }
}

export default function Home () {
    // const session = useSession();
    // const displayName = session?.sessionData?.user?.username;

    useEffect(() => {
        async function fetchLiveData() {
            let live = await checkIfLive('stableronaldo');
            console.log('live:', live);
            embedTwitch();
        }
        fetchLiveData();
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center w-full">
            <main className="flex min-h-screen w-full max-w-[1200px] flex-col items-center justify-start py-32 px-16 sm:items-start">
                <div id="twitch-embed"></div>
                <script src="https://embed.twitch.tv/embed/v1.js"></script>

                {/* <ReactTwitchEmbedVideo channel="videovomit" /> */}
            </main>
        </div>
    );
}