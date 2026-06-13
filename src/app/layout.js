import "./globals.css";
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { headers } from "next/headers";
import SessionProvider from "./SessionProvider";
import Navbar from "./components/navigation/navigation";

export const metadata = {
    title: "videovomit",
    description: "this is a video hole",
};

export default async function RootLayout ({ children, params }) {
    const session = await getServerSession(options);
    const headerStore = await headers();
    const searchParams = Object.fromEntries(
        new URLSearchParams(headerStore.get('searchParams') || '')
    );

    return (
        <html lang="en">
            <head>
                {/* <link rel="stylesheet" href={globalStyles} /> */}
                <meta property="og:title" content={metadata.title} />
                <meta property="og:description" content={metadata.description} />
                <meta property="og:image" content="https://videovomit.com/paperjam_800.png" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            </head>
            <body
                className={`antialiased`}
            >
                <SessionProvider initialSession={session}>
                    <Navbar />
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}