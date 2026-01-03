'use client';
import { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useHoverIntent } from 'react-use-hoverintent';
import pageRoutes from "@/pageRoutes";
import './navigation.css';

// dropdown object format --> { pageroute: text }

export const navLinks = {
    'homepage': {
        'text': 'homepage',
        'image': '',
    },
    'content': {
        'text': 'content',
        'image': '',
        'dropdown': {
            // 'playlist': 'playlist',
            'archive': ' archive',
            'podcast': 'podcast',
        }
    },
    'shop': {
        'text': 'shop',
        'image': '',
        'dropdown': {
            'browseAll': 'browse all',
            'shirts': 'shirts',
            'headware': 'headware',
            'sweatshirts': 'sweatshirts + hoodies',
            'drinkware': 'drinkware',
            'misc': 'misc',
        }
    },
    'community': {
        'text': 'community',
        'image': '',
        'dropdown': {
            'battleArcade': 'battle arcade',
            'vvod': 'videovomit on demand',
            'guessTheKiller': 'guess the killer',
        }
    },
    'contact': {
        'text': 'contact',
        'image': '',
    },
}

const Navbar = () => {
    const [isHovering, intentRef, setIsHovering] = useHoverIntent({
        timeout: 100,
        sensitivity: 10,
        interval: 200,
    });

    // const mouseOverHandler = useCallback(() => {
    //     () => setIsHovering(true);
    // }, [setIsHovering]);

    const mouseOutHandler = useCallback(() => {
        const currentActive = document.querySelectorAll('.nav-item.active');
        if (currentActive.length) currentActive[0].classList.remove('active');
        () => setIsHovering(false);
    }, [setIsHovering]);

    const mouseOverHandler = (e) => {
        e.target.closest('.nav-item').classList.add('active');
    }

    return(
        <nav>
            <div className="nav-inner">
                <Link href={pageRoutes.homepage} alt="homepage">
                    <Image src="../../../assets/homepage_button.webp" alt="videovomit logo" width={0} height={0} style={{ width: '120px', height: 'auto', }} />
                </Link>

                <div ref={intentRef} onMouseOut={mouseOutHandler}
                    className={`${isHovering ? "nav-links hover" : "nav-links"}`}
                >
                    {Object.keys(navLinks).map(x => 
                        <div
                            key={x} className="nav-item"
                            // className={`${isHovering ? "nav-item hover" : "nav-item"}`}
                            onMouseOver={(e) => {mouseOverHandler(e)}} // onMouseOut={mouseOutHandler}
                        >
                            <Link href={pageRoutes[`${x}`]} alt={navLinks[`${x}`].text}>
                                {navLinks[`${x}`].text}
                            </Link>
                            {navLinks[`${x}`].dropdown ? 
                                <div className="dropdown" data-menu={navLinks[`${x}`].text}>
                                    {Object.keys(navLinks[`${x}`].dropdown).map(y => 
                                        <Link key={y} href={pageRoutes[`${y}`]} alt={navLinks[`${x}`].dropdown[`${y}`]}>
                                            {navLinks[`${x}`].dropdown[`${y}`]}
                                        </Link>
                                    )}
                                </div>
                            : ''}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;