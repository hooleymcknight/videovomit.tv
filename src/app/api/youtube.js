// Replace with your actual API key and Playlist ID
const API_KEY = process.env.YT_API_KEY;
const PLAYLIST_ID = process.env.VV_UC;

// The API endpoint URL for listing playlist items
// 'part=snippet,contentDetails' requests necessary information like video titles and IDs
// 'maxResults=50' retrieves the maximum number of items per page
// const API_URL = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&channelId=${PLAYLIST_ID}&part=snippet,contentDetails`;

const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${PLAYLIST_ID}&maxResults=6&order=date&type=video&key=${API_KEY}`;

// Function to fetch the playlist items
export default async function getPlaylistItems() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching playlist items:', error);
    }
}