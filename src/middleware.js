/**
 * middleware.js
 */
import { NextResponse } from "next/server";

export default function middleware(request) {
    const response = NextResponse.next();
    response.headers.set('searchParams', request.nextUrl.searchParams || 'no value');

    return NextResponse.next(new URL('/homepage', request.url));
}

// // applies next-auth only to matching routes - can be regex
// // ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ['/account'] };