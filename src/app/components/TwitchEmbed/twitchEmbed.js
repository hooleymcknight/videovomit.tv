'use client';
import { useState, useEffect } from "react";
import { useSession } from "@/app/SessionProvider";

export default function TwitchEmbed (props) {
    const [isLive, setIsLive] = useState(false);

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

    useEffect(() => {
        if (!document.querySelectorAll('#twitch-embed *').length && props.live) {
            embedTwitch();
        }
    }, []);

    return (
        <div className="twitch-embed-container" data-active={props.live}>
            <div id="twitch-embed"></div>
            <script src="https://embed.twitch.tv/embed/v1.js"></script>
        </div>
    );
}