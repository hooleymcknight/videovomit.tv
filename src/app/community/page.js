'use client';
import Link from 'next/link';
import Image from 'next/image';
import pageRoutes from '@/pageRoutes';
import { navLinks } from '../components/navigation/navigation';
import { useSession } from '../SessionProvider';
import '../globals.css';
import './community.css';

export default function Community () {
    // const session = useSession();
    // const displayName = session?.sessionData?.user?.username;

    const communityLinks = navLinks.community.dropdown;

    return (
        <div className="flex min-h-screen items-center justify-center">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 sm:items-start">
                {Object.keys(communityLinks).map(x =>
                    <Link key={x} className="community-page-links" href={pageRoutes[`${x}`]} alt={communityLinks[`${x}`]}>
                        {communityLinks[`${x}`]}
                    </Link>
                )}
            </main>
        </div>
    );
}