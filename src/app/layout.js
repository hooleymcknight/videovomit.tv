import "./globals.css";
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import SessionProvider from "./SessionProvider";
import Navbar from "./components/navigation/navigation";

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
                <Navbar />
                <SessionProvider session={session}>
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}