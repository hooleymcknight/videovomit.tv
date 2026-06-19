'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import pageRoutes from '@/pageRoutes';
import { useSession } from '../../SessionProvider';
import { addGameData, pullGamesData } from "./components/server/vvod";
import '../../globals.css';
import './vvod.css';


const consoles = [
    'Atari',
    'NES',
    'Super Nintendo',
    'Sega Genesis',
    'Turbo Grafix 16',
    'GameBoy',
    'GameBoy Advance',
    'Nintendo 64',
    'PlayStation',
    'Dreamcast',
]

export default function VVOD () {
    const [gamesData, setGamesData] = useState([]);
    const role = useSession()?.session?.user?.role;

    const loadData = async () => {
        const res = await pullGamesData(gamesData);
        if (res.ok && res.length) { // not sure if length check is helpful.
            setGamesData([...res]);
        } else {
            window.alert(`There was an error retrieving game entries: ${res.message}`);
        }
    }

    const addGame = async (e) => {
        const container = e.target.closest('.add-game');
        let title = container.querySelector('input#title').value || '';
        let platform = container.querySelector('select#platform').value || '';

        if (!title.length || !platform.length) {
            window.alert('Please check game info and try again.');
            return;
        }

        let newGameData = {
            title: title,
            platform: platform.toLowerCase(),
        }

        const res = await addGameData(newGameData);
        if (res.ok) {
            window.alert('Game added!');
            loadData();
        } else {
            window.alert(`There was an error adding the game: ${res.message}`);
        }
    }

    useEffect(() => {
        if (!gamesData.length) {
            loadData();
        }
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center py-48">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start px-16 sm:items-start">
                <h1 style={{ marginBottom: '20px' }}>VVOD Games Played So Far</h1>

                <select>
                    <optgroup label="Guests">
                        <option>NiftyKatie</option>
                        <option>Oaklore Gaming</option>
                    </optgroup>
                    <optgroup label="Events">
                        <option>VVOD</option>
                        <option>Speedrunning</option>
                    </optgroup>
                </select>

                {role === 'admin' ?
                    <div className="add-game">
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

                        <button id="add-vvod" onClick={(e) => {addGame(e)}}>Add</button>

                    </div>
                :
                '' }

                {gamesData.length ?
                    <div className="games-data grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[20px]">
                        {consoles.sort().map(x =>
                            <div key={x} className="platform-section">
                                <div className="console-heading">
                                    <Image src={`../assets/platform-icons/${x.toLowerCase().replace(/\s+/g, '')}.png`} alt={x} width={36} height={36} />
                                    <h2>{x}</h2>
                                </div>

                                <ul>
                                    {gamesData.filter(y => y.platform.toLowerCase() === x.toLowerCase()).map(z => z.title).sort().map(data =>
                                        <li key={data}>{data}</li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                :
                '' }
            </main>
        </div>
    );
}