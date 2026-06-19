'use server';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/lib/db.js'

async function validateNewGame(data) {
    const duplicateTitle = await db.vvod.findMany({
        where: {
            title: data.title,
            platform: data.platform
        }
    });

    if (duplicateTitle.length) {
        return 'This game has already been played. Please try another again.';
    }

    // if no duplicates, then we can return false.
    return false;
}

export async function pullGamesData () {
    try {
        const gamesData = await db.vvod.findMany({});
        return gamesData;
    }
    catch (e) {
        console.error(e);
        return 'Error retrieving VVOD game data.';
    }
}

export async function addGameData (gameData) {
    const session = await getServerSession(options);
    if (!session || session.user.role !== 'admin') {
        return 'Not authorized.';
    }

    const duplicateData = await validateNewGame(gameData);

    if (!duplicateData) {
        try {
            await db.vvod.create({
                data: { title: gameData.title, platform: gameData.platform },
            });
            return true;
        } catch (e) {
            console.error(e);
            return 'There has been an unknown error. Please refresh and try again.';
        }
    }
    else {
        return duplicateData;
    }
}