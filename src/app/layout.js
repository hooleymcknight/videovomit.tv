// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import SessionProvider from "./SessionProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
    title: "videovomit",
    description: "this is a video hole",
};

export default async function RootLayout ({ children }) {
    const session = await getServerSession(options);

    return (
        <html lang="en">
            <head>
                {/* <link rel="stylesheet" href={globalStyles} /> */}
                <meta property="og:title" content={metadata.title} />
                <meta property="og:description" content={metadata.description} />
                <meta property="og:image" content="https://videovomit.com/paperjam_800.png" />
            </head>
            <body
                className={`antialiased`}
            >
                <SessionProvider session={session}>
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}

// module.exports = { RootLayout, metadata }