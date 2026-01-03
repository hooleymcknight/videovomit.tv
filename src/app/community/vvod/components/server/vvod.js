'use server';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

/* register new user */
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
    const gamesData = await db.vvod.findMany({});
    return gamesData;
}

export async function addGameData (gameData) {
    const duplicateData = await validateNewGame(gameData);

    if (!duplicateData) {
        const addGame = await db.vvod.create({
            data: {
                title: gameData.title,
                platform: gameData.platform,
            }
        })
        .then(() => {
            return true;
        })
        .catch((e) => {
            console.error(e);
            return 'There has been an unknown error. Please refresh and try again.'
        });
    }
    else {
        return duplicateData;
    }
}