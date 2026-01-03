/**
 * middleware.js
 */
// export { default } from 'next-auth/middleware';
import { NextResponse } from "next/server";

export default function middleware(request) {
    return NextResponse.next(new URL('/', request.url));
}

// // applies next-auth only to matching routes - can be regex
// // ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ['/account'] };

// export default config;

/**
 * proxy.js
 */
// import { NextResponse } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function proxy(request) {
//   return NextResponse.redirect(new URL('/', request.url))
// }
 
// export const config = {
//   matcher: ['/account'],
// }