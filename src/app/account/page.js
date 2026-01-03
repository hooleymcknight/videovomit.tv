'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "../SessionProvider";
import pageRoutes from "@/pageRoutes";

import '../globals.css';
// import '../styles/account.css';

export default function Account() {
    const session = useSession().sessionData;
    const displayName = session?.sessionData?.user?.username;

    return (
        <div className="account main-container grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <div className="login-link">
                <Link href={session?.sessionData ? pageRoutes.account : pageRoutes.signin}>
                    {displayName ? displayName : 'login'}
                    {/* <Image src="./assets/brainscan.png" alt="brain scan" width={0} height={0} style={{width: '40px', height: 'auto', }} /> */}
                </Link>
                { displayName ?
                    <Link href={pageRoutes.signout}>
                        sign out
                    </Link>
                :
                    <Link href={pageRoutes.register}>
                        {/* <Image src="./assets/pain.png" alt="pain" width={0} height={0} style={{width: '40px', height: 'auto', }} /> */}
                        register
                    </Link>
                }
            </div>
            <Link href="/" className="homepage-logo">
                {/* <Image src="/GoG-logo.svg" alt="GoG Community logo" width={180} height={38} /> */} homepage
            </Link>
            <main className="account flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1>vvTV {session?.user?.type === 'admin' ? 'Admin' : 'User'} Account Page</h1>
                <div className="">
                    {/* <Image src="/fireteam/triangle.png" alt="triangle icon" width={0} height={0} style={{width: '40px', height: 'auto', }} /> */}
                    {session?.user?.username}
                </div>

                <div className="account-sidebar">
                </div>

                <div className="acct-info-group">
                </div>
            </main>
        </div>
    );
}
