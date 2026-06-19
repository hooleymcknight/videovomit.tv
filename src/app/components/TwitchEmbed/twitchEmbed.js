'use client';
import { useEffect } from "react";
import '../Typewriter/typewriter.css'

export default function TwitchEmbed (props) {
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
            <div className="twitch-embed-container w-full" data-active={props.live}>
                <h2 className="flex items-center mb-4 leading-none text-[32px] px-[14px] py-[8px] w-fit bg-black">
                    <span className="inline-block w-[28px] h-[28px] bg-[#cf0404] rounded-[50%] mr-4"></span>
                    <span className="live line-1 anim-typewriter inline-block items-center leading-none text-[#cf0404]">LIVE NOW </span>
                </h2>
                <div id="twitch-embed" className="w-full mb-32"></div>
                <script src="https://embed.twitch.tv/embed/v1.js"></script>
            </div>
        </>
    );
}