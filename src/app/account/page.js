'use client';
import { useState } from "react";
import { useSession } from "../SessionProvider";

import AccountInfo from "./components/accountInfo";
import EditEvents from "./components/editEvents";
import Messages from "./components/messages";

import '../globals.css';
import './account.css';

export default function Account() {
    const acctTabs = ['Account'];
    const [activeTab, setActiveTab] = useState(acctTabs[0]);

    const session = useSession().sessionData;
    const displayName = session?.user?.username;

    return (
        <div className="account main-container grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="account flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1>vvTV {session?.user?.type === 'admin' ? 'Admin' : 'User'} Account Page</h1>
                <div className="">
                    {displayName}
                </div>

                <div className="account-page-content md: flex justify-between">
                    <div className="account-sidebar md:w-[20%] md:flex-col flex gap-[20px] mb-[40px]">
                        {
                            acctTabs.map(x => 
                                <button key={x} onClick={() => {setActiveTab(x)}}
                                    className={`acct-tab bg-[#000000cc] px-[8px] py-[12px] 
                                        ${activeTab === x ? 'active-tab' : ''}`}
                                >
                                    {x}
                                </button>
                            )
                        }
                    </div>

                    <div className="acct-info-group md:w-[70%]">
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
