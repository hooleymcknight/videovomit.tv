import { db } from "@/lib/db";

const channelName = 'videovomit';
const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;

/*

const oac = await db.admin.upsert({
                where: { field: 'twitchOauthCode' },
                update: { value: oauthCode },
                create: {
                    field: 'twitchOauthCode',
                    value: oauthCode,
                }
            });

            const refreshToken = (await db.admin.findFirst({
        where: { field: 'twitchRefreshToken' }
    }))?.value;

 */

const formatForDB = (dateObj) => {
    const YYYY = dateObj.getFullYear();
    const MM = String(dateObj.getMonth() + 1).padStart(2, 0);
    const DD = String(dateObj.getDate()).padStart(2, 0);
    const HH = String(dateObj.getHours()).padStart(2, 0);
    const mm = String(dateObj.getMinutes()).padStart(2, 0);
    const ss = String(dateObj.getSeconds()).padStart(2, 0);

    return `${YYYY}-${MM}-${DD} ${HH}:${mm}${ss}.000`;
}

const fetchStreams = async (token) => {
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${channelName}`, {
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`
        },
        cache: 'no-store',
    });
}

const getAppToken = async () => {
    const response = await fetch(`https://id.twitch.tv/oauth2/token/?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            "client_id": clientId,
            "client_secret": clientSecret,
            "grant_type": "client_credentials"
        })
    });
    // {"access_token":"ACCESS_TOKEN","expires_in":4914532,"token_type":"bearer"} // ~ 60 days expiry, if this is seconds, which it probably is.
    if (!response.ok) return false;

    // cache "admin table?????" w/ timestamp
    await db.admin.upsert({
        where: { field: 'twitchEmbedToken' },
        update: {
            value: response.access_token,
            updated: (new Date().toISOString().slice(0, 19).replace('T', ' ')),

        },
        create: {
            field: 'twitchEmbedToken',
            value: response.access_token,
        }
    });
}

export const areYouLive = async () => {
    let token = (await db.admin.findFirst({
        where: { field: 'twitchEmbedToken' }
    }))?.value;
    
    let res = await fetchStreams(token);

    if (res.status === 401) { // unauthorized
        token = await getAppToken();
        res = await fetchStreams(token);
    }
    if (!res.ok) return false;

    const data = await res.json();
    return data.data; // empty array is offline. non empty is live.
}