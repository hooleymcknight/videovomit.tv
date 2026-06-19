'use client';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export default function YtCarousel (props) {
    console.log(props.items)

    return (
        <div className="flex flex-wrap gap-[20px]">
            {
                props.items && props.items.length ?
                    props.items.map(x => 
                        <div className="w-[450px]" data-purpose="yt-embed-container" key={x.id}>
                            <LiteYouTubeEmbed
                                id={x.snippet.resourceId.videoId}
                                title={x.snippet.title}
                            />
                        </div>
                    )
                :
                null
            }
        </div>
    );
}