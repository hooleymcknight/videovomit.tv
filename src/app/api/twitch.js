export default async function areYouLive() {
    const channelName = 'videovomit'; // Replace with the channel name
    const clientId = process.env.TWITCH_CLIENT_ID; // Replace with your Client ID
    const accessToken = process.env.TWITCH_APP_TOKEN; // Replace with your Access Token
    
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${channelName}`, {
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Twitch API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
}