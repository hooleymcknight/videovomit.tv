// middleware.js
export { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        // withAuth gates before this runs.
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token?.id,
        },
    }
);

export const config = { matcher: ['/account/:path*'] };