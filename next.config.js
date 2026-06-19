/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // change to true after cleanup to discover how many effect/render bugs we have :)

    images: {
        unoptimized: true,
    },

    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    // don't let browsers guess content types (MIME-sniffing attacks)
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    // block OTHER sites from framing yours (clickjacking).
                    // does NOT affect you embedding Twitch/YouTube outward.
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    // trim referrer info sent to other origins
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    // deny APIs you don't use
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                    // HSTS — safe now that HTTP->HTTPS redirect is confirmed.
                    // no `preload` yet (that's a hard-to-reverse commitment).
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
                    // NOTE: Content-Security-Policy intentionally omitted — it's the one
                    // that fights the Twitch/YouTube embeds. Separate, tested task later.
                ],
            },
        ];
    },
};

export default nextConfig;