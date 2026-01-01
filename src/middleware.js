/**
 * middleware.js
 */
export { default } from 'next-auth/middleware';

// // applies next-auth only to matching routes - can be regex
// // ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ['/portal'] };

/**
 * proxy.js
 */
// import { NextResponse } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function proxy(request) {
//   return NextResponse.redirect(new URL('/', request.url))
// }
 
// export const config = {
//   matcher: ['/portal'],
// }