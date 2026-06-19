import { db } from "@/lib/db";

const channelName = 'videovomit';
const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;

// this didn't get used...but I'm gonna hold onto it for a sec.
const formatForDB = (dateObj) => {
    const YYYY = dateObj.getFullYear();
    const MM = String(dateObj.getMonth() + 1).padStart(2, 0);
    const DD = String(dateObj.getDate()).padStart(2, 0);
    const HH = String(dateObj.getHours()).padStart(2, 0);
    const mm = String(dateObj.getMinutes()).padStart(2, 0);
    const ss = String(dateObj.getSeconds()).padStart(2, 0);

    return `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}.000`;
}

const isRealDate = (value) => {
  return value instanceof Date && !isNaN(value.valueOf());
}

const getExpiryDate = (updatedDate, givenExpirySec) => {
    if (!updatedDate || !givenExpirySec || !isRealDate(updatedDate)) return false;
    const expiresAt = updatedDate.getTime();
    return new Date(expiresAt + (givenExpirySec * 1000));
}

// this function isnt getting used here but it very well might get used later on here or elsewhere
// so I'm keeping it for now
const getExpiredStatus = (updatedDate, givenExpirySec) => {
    const expireDT = getExpiryDate(updatedDate, givenExpirySec);
    return !expireDT ? false : (new Date() > expireDT);
}

const fetchStreams = async (token) => {
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${channelName}`, {
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store',
    });
    return response;
}

const getAppToken = async () => {
    const response = await fetch(`https://id.twitch.tv/oauth2/token`, {
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

    const resJson = await response.json();
    const accessToken = resJson.access_token;
    const expiresIn = resJson.expires_in;

    // cache "admin table" w/ timestamp
    const updatedDate = new Date();
    const expiryDate = getExpiryDate(updatedDate, expiresIn);

    await db.admin.upsert({
        where: { field: 'twitchEmbedToken' },
        update: {
            value: accessToken,
            updated: updatedDate,
            expiry: expiryDate || null,
        },
        create: {
            field: 'twitchEmbedToken',
            value: accessToken,
            updated: updatedDate,
            expiry: expiryDate || null,
        }
    });

    return accessToken;
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