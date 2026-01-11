/**
 * middleware.js
 */
import { NextResponse } from "next/server";

export default function middleware(request) {
    return NextResponse.next(new URL('/homepage', request.url));
}

// // applies next-auth only to matching routes - can be regex
// // ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ['/account'] };