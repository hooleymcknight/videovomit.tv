// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout ({ children }) {
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
            {children}
        </body>
    </html>
  );
}

// module.exports = { RootLayout, metadata }