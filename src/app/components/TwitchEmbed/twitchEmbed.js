'use client';
import { useState, useEffect } from "react";
import { useSession } from "@/app/SessionProvider";

export default function TwitchEmbed (props) {
    const [isLive, setIsLive] = useState(false);
    const session = useSession().sessionData;

    const twitchAuthUrl = props.reauth ? `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${props.reauth}&redirect_uri=http://localhost:3000/homepage&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls` : '#';

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
                parent: ["videovomit.tv"],
            });
        }
    }

    useEffect(() => {
        if (!document.querySelectorAll('#twitch-embed *').length && props.live) {
            embedTwitch();
        }
    }, []);

    return (
        <>
            <div className="twitch-embed-container" data-active={props.live}>
                <div id="twitch-embed"></div>
                <script src="https://embed.twitch.tv/embed/v1.js"></script>
            </div>
            {/* { props.reauth && session?.user?.type === 'admin' ?  */}
            { props.reauth ?
                <>
                    <a href={twitchAuthUrl} alt="Reconnect twitch" target="_blank" style={{ marginTop: '40px' }}>Reauthorize Twitch</a>
                </>
            :
                <></>
            }
        </>
    );
}