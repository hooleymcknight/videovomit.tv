// export default async function isLive(req, res) {
//     const channelName = 'videovomit'; // Replace with the channel name
//     const clientId = process.env.TWITCH_CLIENT_ID; // Replace with your Client ID
//     const accessToken = process.env.TWITCH_APP_TOKEN; // Replace with your Access Token

//     try {
//         const response = await fetch(`https://api.twitch.tv/${channelName}`, {
//             headers: {
//                 'Client-ID': clientId,
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`Twitch API error: ${response.statusText}`);
//         }

//         const data = await response.json();

//         // If the 'data' array is not empty, the streamer is live
//         const isStreamLive = data.data.length > 0;

//         res.status(200).json({ isLive: isStreamLive, data: data.data[0] || null });

//     } catch (error) {
//         console.error("Error checking live status:", error);
//         res.status(500).json({ error: "Failed to check live status" });
//     }
// }