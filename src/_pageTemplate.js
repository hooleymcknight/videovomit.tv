'use client';
import Link from 'next/link';
import Image from 'next/image';
import pageRoutes from '@/pageRoutes';
import { useSession } from '../SessionProvider';
import '../globals.css';

export default function Home () {
    // const session = useSession();
    // const displayName = session?.sessionData?.user?.username;

    return (
        <div className="flex min-h-screen items-center justify-center">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 sm:items-start">
                
            </main>
        </div>
    );
}