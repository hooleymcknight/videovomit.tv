/*
    middleware.js must be changed manually
*/

const pageRoutes = {
    'home': '/',
    'index': '/',
    'account': '/account',
    'register': '/register',
    'signin': '/api/auth/signin?callbackUrl=%2F',
    'signout': '/api/auth/signout?callbackUrl=%2F',
}

export default pageRoutes;