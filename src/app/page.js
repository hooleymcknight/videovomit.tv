'use client';
import Link from 'next/link';
import Image from 'next/image';
import Glitch from './components/Glitch/glitch';
import GlitchText from './components/GlitchText/glitchText';
import Typewriter from './components/Typewriter/typewriter';
import pageRoutes from '@/pageRoutes';
import { useSession } from "./SessionProvider";
import './globals.css';
import './styles/index.css';
import { useEffect } from 'react';

// data:image/gif;base64,R0lGODdhQQA+AHcAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAAACwAAAAAQQA+AIMAAAAYESMiGisyLDt+GRk9MFO8OjrbR19rf4Ee5Ot+6+qNwbkAAAAAAAAAAAAAAAAE/xDISau9FOnFF/5gKFYaUpxo0Y1si2lpnHJuPcJyjtJ2n5m64M7jq+GEyBOvGDomnyoi0+KEWpfTqnUbZWq5YCzrCy53x+a0TgoCqt8zkRsOZ18Gc7p6gQAN8HpvfH0Yfyd5gVAKiwoahQV/homKjSWNGJCRf4iTKYsloAp3mqSciZ+gqYQUmaSapm+oqqEWra6vgbKztBW2t7hquru8rL/GsELCw8QTvsalVsrLzBLOz6XI0tPUANbXrqAdHNvbor3XAQHfOeQlkarmxcYBAgLpz3mD5H8J/anxzZ7Rq2cP3452CPj182eplkCCBZ8d3DcgwaKFCRqemwdRnUF92//4MVqoUZ6Bk6QG1vMoEeQyhRYvZtQAsNrJmyj/qIz4zKWGd6BgxlQwE0FNnDcPHIi0k6UxnzCDVsR4sSTSk0qVMu34zaXQol9J0gRw1UDWrFsJOv0FUiRRsWGLGiVAAOfZs2lXdpU6FO5UjHIV0KV7925enk/d/R0J9i9DS4MJFMark+s1fUJH8u2HJ1TkyWgrq93703FMuQmBeh4MWqtovZcVAxZLTjDr1mnTrb2F2fTj2p9x69R9L3bp2ain2SYsfLhu0scxIjQKIDhoV8WNy+Y8XZT1yd8Sp3qF0Nz3wuHZTl9m/vb19K58rh8r4Xxo+PHnz6Jg3xt++eux8V1ZM/6F59V0YtQn2QEXnICfJm0hlKALDj6I2U/TTNhDheldmKEdU1RTIIQYLqNhiCKS1tksJ6LISoEFlJhKiy7WYg0k8tFYIya2tAKSjjuCkAIp4gTpYg4uRgAAIfkECQoAAAAsAAAAAEEAPgCDAAAAGBEjIhorMiw7fhkZPTBTvDo620dfa3+BHuTrfuvqjcG5AAAAAAAAAAAAAAAABP8QyEmrvRTpxRf+YChWGlKcaNGNbItpaZxybj3Cco7Sdp+ZuuDO46vhhMgTrxg6Jp8qItPihFqX06p1G2VquWAs6wsud8fmtE4KAqrfM5EbDmdfBnO6eoEADfB6b3x9GH8neYFQCosKGoUFf4aJio0ljRiQkX+IkymLJaAKd5qknImfoKmEFJmkmqZvqKqhFq2ur4Gys7QVtre4arq7vKy/xrBCwsPEE77GpVbKy8wSzs+lyNLT1ADW166gHRzb26K91wEB3znkJZGq5sXGAQIC6c95g+R/Cf2p8c2e0atnD9+Odgj49fNnqZZAggWfHdw3IMGihQkanotkoGOkgfX/1BnUt40fo4Ua5XVc6RFkRIkklym0eDGjBoDVWK48cGCAS5HPYmp4B2omTQU2EeDU2ZEnT58QgRoTOrNoRYwXUzI14NQpVIJSf8U0mpQsypsSCBBg2bXr15DfSJpEetZsUqVp1RJo2/bty6lWj9a9ivGuOb17+Xr9Gdcd4ZNlCTPUiFjx4qiNh0o+GbgfHl6VLfdkfE0f2axWN/3Lq1b0aMylHRc+S+6wXtdf04W9ZVoy7dqsE1v2qftebM2z75YLjpu47szIMSLEy1y0JuPHZXueHi/08G+uqBJtB9C7YvDhpy8rf/s8+vTqZ+E0//Q97/izLJj3Zl9ofDsTtHZAWDP8gTfWdGKMcIJ9msiFUIIuLMigaUNNA2EPEqJHoYUATtFNgQ1WuMyFHlYD4gCDfDYLiSWyUmABIqbCYou1WAOJfzPSiIktrZCUo44gpECKOEC2mEOLEQAAIfkECQoAAAAsAAAAAEEAPgCDAAAAGBEjIhorMiw7fhkZPTBTvDo620dfa3+BHuTrfuvqjcG5AAAAAAAAAAAAAAAABP8QyEmrvRTpxRf+YChWGlKcaNGNbItpaZxybj3Cco7Sdp+ZuuDO46vhhMgTrxg6Jp8qItPihFqX06p1G2VquWAs6wsud8fmtE4KAqrfM5EbDmdfBnO6eoEADfB6b3x9GH8neYFQCosKGoUFf4aJio0ljRiQkX+IkymLJaAKd5qknImfoKmEFJmkmqZvqKqhFq2ur4Gys7QVtre4arq7vKy/xrBCwsPEE77GpVbKy8wSzs+lyNLT1ADW166gHRzb26K91wEB3znkJZGq5sXGAQIC6c95g+R/Cf2p8c2e0atnD9+Odgj49fNnqZYrAxAHDKyn7tnBfQMSLFqYoOG5SBD/Q0IkWNCgvm38GC30KE9kyAMHSFa0eHKZQo0bO2oAWM0lRJgwZX6rqeEdqJs4FehEwNOnAaBAhV4jevNoRo4bWQIgQEAkVKhSn9VEupTsyp0UuHL9+jWssZMplZ41u5RpWrVswRKc+dZq0rlXOdYFqJZA3qh7h7oLrLJsYIZaCx8OmnjqYqxZL/fDw0zyZLe/9JHNvHjTv7trP1cWq1lw3WmE8apOxzd0a44I7U7wfJj2PctFH59tFzt1b9+Kb7+GXYF33j+/gbfmTLy57MPfSFE1Wt268a/ZXRHNzc05zPC3xpPX7d0wUPS216sCkdobfPW57YA4AV98KurkiDECTn/9/QEXQgK6QOB97hQ1TYI9LJidaNtAyISErCX0oH5T9GJfJIMAmIqFHXpokYOqkFjiBRgaMsB4Kq74gYStnBSjjCGkoN0KOK6Yw4oRAAAh+QQJCgAAACwAAAAAQQA+AIMAAAAYESMiGisyLDt+GRk9MFO8OjrbR19rf4Ee5Ot+6+qNwbkAAAAAAAAAAAAAAAAE/xDISau9FOnFF/5gKFYaUpxo0Y1si2lpnHJuPcJyjtJ2n5m64M7jq+GEyBOvGDomnyoi0+KEWpfTqnUbZWq5YCzrCy53x+a0TgoCqt8zkRsOZ18Gc7p6gQAN8HpvfH0Yfyd5gVAKiwoahQV/homKjSWNGJCRf4iTKYsloAp3mqSciZ+gqYQUmaSapm+oqqEWra6vgbKztBW2t7hquru8rL/GsELCw8QTvsalVsrLzBLOz6XI0tPUANbXrqAdHNvbor3XAQHfOeQlkarmxcYBAgLpz3mD5H8J/anxzX4ZGFivnrpjO9oh4NfPn6VargZKJGjvWsJ9AxIsapjg4blIE/8lHjhg8JoJfdv4MWroUV7IgSNHlrSIchlDjRs7agBY7aWBmDFnPqup4R2omzgV6ETAEwABAhOBAhVqjOjNoxk5bmw54elTqVKp/qqJdGlZljsteCUAdmrFayhVKkV7dilTtV7bBn07FGtSulk52m26Vq9MvlXdBV5pNrBDrhIKGxZ7Sx/SlX774eEmWS9lV5Yd47S70CjnvJMRj1UsGC05wqj1pjvYt6jox6/xfjU8+1vo1qSnwd4t+x7czK5z62bLm3Zt1poV3l2u9xspq6aVU5dqHbT0ZU0jxz7QvfL3XeEp7C6/+rwqFt7YEz1vB8QJ9t6PShcz4j7+P3EpxJ9HC/7J505R0wzYQ4HWWbaNgkwwWNtmw0A4RTXxRTIIhapYeCErGRaAYIf1fRiChIYMMJ+HJn7AYCsosdjiiShct8KMJuZgYgQAIfkEBQoAAAAsAAAAAEEAPgCDAAAAGBEjMiw7fhkZPTBTvDo620dfa3+BHuTrfuvqjcG5AAAAAAAAAAAAAAAAAAAABP8QyEmrvfRoxRX+YChW2kGcKNGNbItpaZxybj3Cco7Sdp+ZuuDO46vhhMgTrxg6Jp8qItPihFqX06p1G2VquWAs6wsud8fmtE4KAqrfM5EbDmdfBHO6WnEACfB6b3x9GH8neYFQCYsJGoUEf4aJio0ljRiQkX+IkymLJaAJd5qknImfoKmEFJmkmqZvqKqhFq2ur4Gys7QVtre4arq7vKy/xrBCwsPEE77GpVbKy8wSzs+lyNLT1ADW166gHRzb26K91wEB3znkJZGq5sXGBfTpz3mD5H8I/Knxzb/oCax3b0e7A/v49bNUy9VAgQYMqHtmUJ8ABIsUImB4LtJDehH/I048puLgPkYKOcr7WCBkyJHGSlpUiHKjhn/VBAwYMNClS5i/8oF6N/QizYwqAe7c6dMn0FtCNSS0KdXoUao4u+lc2vTnt6hTFyK0qhFrw6UDur78WhRjAo1Vy4o9kBUSWrUi2bq7WNNm2JRJc97F+9RVvqk195b1d5YrYb1jNaJsyw8PN7uO1RYmdZisW6pVNzE+N1gz5L+AydXdyvTxtc5yQZdr3Nr0a8VyD9K9QKB0182ahP7VnbWa75/Ag6eaarldcQnHDXzjrOrVwefQM0ufTl33MOzG027n3t07vBHkn0U172iEt/TrzdsBcSK94eW6xbh/f9vdQf0u1GffRGFSTQNgDwJyR6CB803RDX/KIcSgg/RBKMAgzalyIIW98EdAgRo2yOEHCWoCSXwbjlihiZEIlaKKIqTA2QowUpgDhxEAACH5BAUKAAAALAAAAABBAD4AgQAAADIsO34ZGT0wUwJphI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8RGQCAIBo7IpG9pQP6gAOkzEHX2qNYttqrlccO78fTbFaPJOvM1e4b7BusffZn2Uov8vv8PGCg4SFhoSFMAACH5BAVkAAAALAAAAABBAD4AgQAAADIsO34ZGQAAAAJnhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh46AQBAMGI9In9Jw/D0BUWcA2uxNq9orNcvbgndiqZcbPo91ZSvW/HZ/zUp0d0rM6/f8vv8PGCg4SDhTAAA7

export default function Home () {
    // const session = useSession();
    // const displayName = session?.sessionData?.user?.username;

    useEffect(() => {
        if (window.location.pathname === '/') {
            document.documentElement.classList.add('coming-soon');
        }
        else {
            document.documentElement.classList.remove('coming-soon');
        }
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center font-sans bg-black dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 bg-black dark:bg-black sm:items-start">
                <div className="mb-20 w-full">
                    <GlitchText firstSpan="video" secondSpan="vomit" />
                </div>
                <Glitch />
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        {/* videovomit */}
                    </h1>
                </div>
                <div className="flex justify-center mt-20 w-full">
                    <Typewriter text="coming soon..." />
                </div>
            </main>

            {/* <Image className="moth-spider" src="./assets/moth.gif" alt="moth for spider" width={0} height={0} style={{ width: '100px', height: 'auto' }} /> */}
        </div>
    );
}