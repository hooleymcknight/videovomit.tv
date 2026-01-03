'use client';
import Link from 'next/link';
import Image from 'next/image';
import pageRoutes from '@/pageRoutes';
import { useSession } from '../../SessionProvider';
import { pullGamesData } from "./components/server/vvod";
import '../../globals.css';
import './vvod.css';
import { useEffect, useState } from 'react';

const consoles = [
    'Atari',
    'NES',
    'Super Nintendo',
    'Sega Genesis',
    'Turbo Grafix 16',
    'Gameboy',
    'Gameboy Advance',
    'Nintendo 64',
    'PlayStation',
    'Dreamcast',
]

export default function VVOD () {
    const [gamesData, setGamesData] = useState([]);
    const session = useSession();
    // const userType = session?.sessionData?.user?.type;
    let userType = 'admin'

    const loadData = async () => {
        // let gamesData = await pullGamesData();

        let res = await pullGamesData()
        .then((response) => {
            if (response) {
                setGamesData([...response]);
            }
            else {
                console.error('No game data to load.')
            }
        })
        .catch((err) => {
            console.error(err);
            return 'There has been an unknown error. Please refresh and try again.'
        });
    }

    useEffect(() => {
        // console.log('use effect', typeof(gamesData[0]))
        if (!gamesData.length) {
            loadData();
        }
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 sm:items-start">
                <h1>VVOD Games Played So Far</h1>

                {userType === 'admin' ?
                    <div className="add-game" style={{ marginBottom: '80px' }}>
                        <h2>Add Game:</h2>

                        <label htmlFor="title" className="input-group">Game title
                            <input id="title" type="text" placeholder="game title" autoComplete='off' />
                        </label>

                        <label htmlFor="platform" className="input-group">Platform
                            <select id="platform">
                                <option defaultValue={true}>Pick a platform:</option>
                                {consoles.sort().map(x => 
                                    <option key={x} value={x}>{x}</option>
                                )}
                            </select>
                        </label>

                        <button id="add-vvod">Add</button>

                    </div>
                :
                '' }

                {gamesData.length ?
                    <div className="games-data">
                        {consoles.sort().map(x =>
                            <div key={x} className="platform-section">
                                <h3>{x}</h3>
                                {gamesData.filter(y => y.console === x).map(z => z.title).sort().map(data =>
                                    <p key={data} style={{ marginLeft: '20px' }}>{data}</p>
                                )}
                            </div>
                        )}
                    </div>
                :
                '' }
            </main>
        </div>
    );
}