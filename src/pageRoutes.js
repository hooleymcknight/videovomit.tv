/*
    middleware.js must be changed manually
*/

const pageRoutes = {
    'homepage': '/homepage',
    'index': '/',
    'account': '/account',
    'register': '/register',
    'signin': '/api/auth/signin?callbackUrl=%2F',
    'signout': '/api/auth/signout?callbackUrl=%2F',

    /* content */
    'content': '/content',
    'playlist': '/content/playlist',
    'archive': '/content/archive',
    'podcasts': '/content/podcasts',

    /* merch */
    'merch': '/merch',
    'browseAll': '/merch/all',
    'shirts': '/merch/shirts',
    'headware': '/merch/headware',
    'sweatshirts': '/merch/sweatshirts-and-hoodies',
    'drinkware': '/merch/drinkware',
    'misc': '/merch/misc',

    /* community */
    'community': '/community',
    'battleArcade': '/community/battle-arcade',
    'vvod': '/community/vvod',
    'guessTheKiller': '/community/guess-the-killer',

    /* contact */
    'contact': '/contact',
}

export default pageRoutes;