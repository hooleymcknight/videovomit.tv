import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcryptjs';

const db = new PrismaClient();
const salt = bcrypt.genSaltSync(12);

const channelName = 'videovomit';
const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;
// const accessToken = process.env.TWITCH_APP_TOKEN;
// const oauthCode = process.env.TWITCH_OAUTH_CODE;

export async function getInitialTokens (clientId, clientSecret, oauthCode) {
    const result = fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            code: oauthCode,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3000'
        })
    })
    .then((res) => {
        return res.json();
    })
    .then((result) => {
        if (result.message?.includes('Invalid authorization code')) {
            return { clientId: clientId };
        }
        else if (result.access_token) {
            return result;
        }
        else {
            return { error: result };
        }
        // const hashedCurrentPW = bcrypt.hashSync(unhashed, salt);
        // const isMatch = bcrypt.compareSync(unhashed, hashed);
    })
    .catch((err) => {
        console.error('Error!!!!', err);
    });
    return result;
}

const updateDatabaseTokens = async (result) => {
    console.log('update database tokens')
    console.log(result);
    const accessToken = result.access_token || null;
    const refreshToken = result.refresh_token || null;
    
    const newAT = await db.admin.upsert({
        where: { field: 'twitchAccessToken' },
        update: { value: result.access_token },
        create: {
            field: 'twitchAccessToken',
            value: result.access_token,
        }
    });

    const newRT = await db.admin.upsert({
        where: { field: 'twitchRefreshToken' },
        update: { value: result.refresh_token },
        create: {
            field: 'twitchRefreshToken',
            value: result.refresh_token,
        }
    });

    return [ newAT, newRT ];
}

const getAccessTokenFromRefresh = async (oauthCode) => {
    const refreshToken = (await db.admin.findFirst({
        where: { field: 'twitchRefreshToken' }
    }))?.value;

    const response = await fetch(`https://id.twitch.tv/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        })
    });

    console.log('response without refresh token', response)

    if (!response.ok) {
        console.log(oauthCode)
        if (oauthCode?.length) {
            const oac = await db.admin.upsert({
                where: { field: 'twitchOauthCode' },
                update: { value: oauthCode },
                create: {
                    field: 'twitchOauthCode',
                    value: oauthCode,
                }
            });
        }
        else {
            oauthCode = (await db.admin.findFirst({
                where: { field: 'twitchOauthCode' }
            }))?.value;
        }
        
        let result = await getInitialTokens(clientId, clientSecret, oauthCode);
        if (result.clientId) {
            console.log('trying to return the client id')
            return result;
        }
        else {
            const ready = await updateDatabaseTokens(result);
            console.log('ready', ready);
            return 'retry';
        }
    }
    
    // update access token, response.access_token
    // update refresh token too
    const ready = await updateDatabaseTokens(await (response.json()));
    console.log('ready', ready);
    return 'retry';

}

export default async function areYouLive (oauthCode) {
    const accessToken = (await db.admin.findFirst({
        where: { field: 'twitchAccessToken' }
    }))?.value;
    
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${channelName}`, {
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`
        },
        cache: 'no-store',
    });

    console.log('response:', accessToken)

    if (!response.ok) {
        console.log(`Twitch API error: ${response.statusText}`);
        
        if (response.statusText.toLowerCase().includes('unauthorized')) {
            const ready = await getAccessTokenFromRefresh(oauthCode);
            console.log('got at from rt?', ready)
            return ready;
        }
        console.log('here to return false')
        return false;
    }

    const data = await response.json();
    console.log('data????')
    return data.data;
}