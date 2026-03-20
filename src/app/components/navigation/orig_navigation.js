'use client';
import { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from '@/app/SessionProvider';
import { useHoverIntent } from 'react-use-hoverintent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pageRoutes from "@/pageRoutes";
import './navigation.css';
import { faSignIn, faUser } from '@fortawesome/free-solid-svg-icons';

// dropdown object format --> { pageroute: text }

const navPath = '../../../assets/nav';

export const navLinks = {
    /* 'homepage': {
        'text': 'homepage',
        'image': '',
    }, */
    'content': {
        'text': 'content',
        'image': 'nav_content.webp',
        'dropdown': {
            'playlist': {
                'text': 'playlist',
                'image': '',
            },
            'archive': {
                'text': 'archive',
                'image': 'nav_vod_archives.webp',
            },
            'podcasts': {
                'text': 'podcasts',
                'image': 'nav_podcasts.webp',
            },
        }
    },
    'merch': {
        'text': 'merch',
        'image': 'nav_merch.webp',
        // 'dropdown': {
        //     'browseAll': {
        //         'text': 'browse all',
        //         'image': '',
        //     },
        //     'shirts': {
        //         'text': 'shirts',
        //         'image': '',
        //     },
        //     'headware': {
        //         'text': 'headware',
        //         'image': '',
        //     },
        //     'sweatshirts': {
        //         'text': 'sweatshirts + hoodies',
        //         'image': '',
        //     },
        //     'drinkware': {
        //         'text': 'drinkware',
        //         'image': '',
        //     },
        //     'misc': {
        //         'text': 'misc',
        //         'image': '',
        //     },
        // }
    },
    'community': {
        'text': 'community',
        'image': '',
        'dropdown': {
            'battleArcade': {
                'text': 'battle arcade',
                'image': 'nav_battlearcade.webp',
            },
            'vvod': {
                'text': 'videovomit on demand',
                'image': '',
            },
            'guessTheKiller': {
                'text': 'guess the killer',
                'image': '',
            },
        }
    },
    'contact': {
        'text': 'contact',
        'image': '',
    },
}

const Navbar = () => {
    const session = useSession().sessionData;
    const displayName = session?.user?.username;

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

    const mobileMenuToggleHandler = (e) => {
        e.preventDefault();
        let toggle = e.target.closest('.mobile-nav-toggle');
        if ( toggle.classList.contains('active-menu') ) {
            toggle.classList.remove( 'active-menu' );
        } else {
            toggle.classList.add( 'active-menu' );
        }
    }

    const mobileNavItemClickHandler = (e) => {
        e.preventDefault();
        const navItem = e.target.closest('.nav-item');
        if (!navItem.classList.contains('mobile-active')) {
            const thisText = navItem.dataset.text;
        
            const prevActive = document.querySelectorAll(`.nav-item.mobile-active:not([data-text="${thisText}"])`);
            if (prevActive.length) {
                prevActive.forEach((prev) => { prev.classList.remove('mobile-active') });
            }

            navItem.classList.add('mobile-active');
        }
    }

    return(
        <nav>
            <div className="nav-inner">
                <Link href={pageRoutes.homepage} alt="homepage">
                    <Image src={`${navPath}/nav_home.webp`} alt="videovomit logo" width={0} height={0} style={{ width: 'auto', height: '80px', }} />
                </Link>

                <div className="nav-links-container">
                    <div className="mobile-nav-toggle" onClick={(e) => {mobileMenuToggleHandler(e)}}>
                        <a className="main-nav-toggle" href="#main-nav"><i>Menu</i></a>
                    </div>
                    <div ref={intentRef} onMouseOut={mouseOutHandler}
                        className={`${isHovering ? "nav-links hover" : "nav-links"}`}
                    >
                        {Object.keys(navLinks).map(x => 
                            <div
                                key={x} className="nav-item"
                                data-text={navLinks[`${x}`].text}
                                data-image={!!navLinks[`${x}`].image.length}
                                onMouseOver={(e) => {mouseOverHandler(e)}}
                                // onClick={(e) => {mobileNavItemClickHandler(e)}}
                            >
                                <Link className="top-link" href={pageRoutes[`${x}`]} alt={navLinks[`${x}`].text}>
                                    {navLinks[`${x}`].image.length ?
                                        
                                        <Image src={`${navPath}/${navLinks[`${x}`].image}`} alt={navLinks[`${x}`].text} width={0} height={0} style={{ width: 'auto', height: '80px', }} />
                                    :
                                        navLinks[`${x}`].text
                                    }
                                </Link>
                                {navLinks[`${x}`].dropdown ?
                                    <div className="dropdown" data-menu={navLinks[`${x}`].text}>
                                        {Object.keys(navLinks[`${x}`].dropdown).map(y => 
                                            <Link key={y} href={pageRoutes[`${y}`]} alt={navLinks[`${x}`].dropdown[`${y}`].text}>
                                                {/* {navLinks[`${x}`].dropdown[`${y}`].text} */}
                                                {navLinks[`${x}`].dropdown[`${y}`].image.length ?
                                                    
                                                    <Image src={`${navPath}/${navLinks[`${x}`].dropdown[`${y}`].image}`} alt={navLinks[`${x}`].dropdown[`${y}`].text} width={0} height={0} style={{ width: 'auto', height: '80px', }} />
                                                :
                                                    navLinks[`${x}`].dropdown[`${y}`].text
                                                }
                                            </Link>
                                        )}
                                    </div>
                                : ''}
                            </div>
                        )}
                        <div className="nav-item">
                            <Link className="account" href={displayName ? pageRoutes.account : pageRoutes.signin} alt={displayName ? 'account page' : 'sign in'}>
                                <FontAwesomeIcon icon={faUser} />
                                <span className="mobile-text">
                                    {displayName ? displayName : 'log in'}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;