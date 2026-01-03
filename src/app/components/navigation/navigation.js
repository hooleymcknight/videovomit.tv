import Link from 'next/link';
import Image from 'next/image';
import pageRoutes from "@/pageRoutes";
import './navigation.css';

// dropdown format --> pageroute: text

const navLinks = {
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
            'sweatshirts': 'sweatshirts and hoodies',
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
    return(
        <nav>
            <div className="nav-inner">
                <Link href={pageRoutes.homepage} alt="homepage">
                    <Image src="../../../assets/homepage_button.webp" alt="videovomit logo" width={0} height={0} style={{ width: '120px', height: 'auto', }} />
                </Link>

                <div className="nav-links">
                    {Object.keys(navLinks).map(x => 
                        <div key={x} className="nav-item">
                            <Link href={pageRoutes[`${x}`]} alt={navLinks[`${x}`].text}>
                                {navLinks[`${x}`].text}
                            </Link>
                            {navLinks[`${x}`].dropdown ? 
                                <div className="dropdown" data-menu={navLinks[`${x}`].text} style={{display: 'none'}}>
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