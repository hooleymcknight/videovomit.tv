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
    'podcast': '/content/podcast',

    /* shop */
    'shop': '/shop',
    'browseAll': '/shop/all',
    'shirts': '/shop/shirts',
    'headware': '/shop/headware',
    'sweatshirts': '/shop/sweatshirts-and-hoodies',
    'drinkware': '/shop/drinkware',
    'misc': '/shop/misc',

    /* community */
    'community': '/community',
    'battleArcade': '/community/battle-arcade',
    'vvod': '/community/vvod',
    'guessTheKiller': '/community/guess-the-killer',

    /* contact */
    'contact': '/contact',
}

export default pageRoutes;