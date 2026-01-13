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

export const navLinks = {
    /* 'homepage': {
        'text': 'homepage',
        'image': '',
    }, */
    'content': {
        'text': 'content',
        'image': '',
        // 'dropdown': {
            // 'playlist': 'playlist',
            // 'archive': ' archive',
            // 'podcast': 'podcast',
        // }
    },
    'shop': {
        'text': 'shop',
        'image': '',
        // 'dropdown': {
        //     'browseAll': 'browse all',
        //     'shirts': 'shirts',
        //     'headware': 'headware',
        //     'sweatshirts': 'sweatshirts + hoodies',
        //     'drinkware': 'drinkware',
        //     'misc': 'misc',
        // }
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
                    <Image src="../../../assets/homepage_button.webp" alt="videovomit logo" width={0} height={0} style={{ width: '120px', height: 'auto', }} />
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
                                onMouseOver={(e) => {mouseOverHandler(e)}}
                                // onClick={(e) => {mobileNavItemClickHandler(e)}}
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