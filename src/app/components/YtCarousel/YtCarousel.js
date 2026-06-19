'use client';
import EmblaCarousel from './Embla/EmblaCarousel';
import './Embla/embla.css';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const OPTIONS = { containScroll: false }

export default function YtCarousel (props) {

    return (
        <div className="w-full">
            {
                props.items && props.items.length ?
                    <EmblaCarousel slides={props.items} options={OPTIONS} />
                :
                null
            }
        </div>
    );
}