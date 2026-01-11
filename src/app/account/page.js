'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "../SessionProvider";
import pageRoutes from "@/pageRoutes";

import AccountInfo from "./components/accountInfo";
import EditEvents from "./components/editEvents";
import Messages from "./components/messages";

import '../globals.css';
import './account.css';

const userTabs = ['Account'];
const adminTabs = ['Account', 'Events', 'Messages'];

export default function Account() {
    const [activeTab, setActiveTab] = useState(userTabs[0]);

    const session = useSession().sessionData;
    const displayName = session?.user?.username;

    let acctTabs = session?.user?.type === 'admin' ? adminTabs : userTabs;

    return (
        <div className="account main-container grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="account flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1>vvTV {session?.user?.type === 'admin' ? 'Admin' : 'User'} Account Page</h1>
                <div className="">
                    {displayName}
                </div>

                <div className="account-page-content">
                    <div className="account-sidebar">
                        {
                            acctTabs.map(x => 
                                <button key={x} onClick={() => {setActiveTab(x)}} className={`acct-tab ${activeTab === x ? 'active-tab' : ''}`}>{x}</button>
                            )
                        }
                    </div>

                    <div className="acct-info-group">
                        {
                            activeTab === 'Account' ? <AccountInfo session={session} /> : ''
                        }
                        {
                            activeTab === 'Events' ? <EditEvents session={session} /> : ''
                        }
                        {
                            activeTab === 'Messages' ? <Messages session={session} /> : ''
                        }
                    </div>
                </div>
                
            </main>
        </div>
    );
}
