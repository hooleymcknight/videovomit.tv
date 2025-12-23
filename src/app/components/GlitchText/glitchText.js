import Image from "next/image";
import './glitchText.css';

export default function GlitchText(data) {
    let spacing = '0px';
    if (data.secondSpan && data.secondSpan.includes(' ')) {
        spacing = '10px';
    }

    return (
        <>
            <h1 className="index-title">
                <span>{data.firstSpan}</span>
                {data.secondSpan ?
                    <span
                        style={{
                            '--data-text': `'${data.secondSpan.trim()}'`,
                            '--spacing': spacing,
                        }}>
                            {data.secondSpan.trim()}
                    </span> : ''
                }
            </h1>
        </>
    );
}
