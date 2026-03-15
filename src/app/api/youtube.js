// Replace with your actual API key and Playlist ID
const API_KEY = process.env.YT_API_KEY;
const mostRecentCount = 6;

// The API endpoint URL for listing playlist items
// 'part=snippet,contentDetails' requests necessary information like video titles and IDs
// 'maxResults=50' retrieves the maximum number of items per page
// playlist url: https://www.youtube.com/playlist?list=PLCLLPATZiHLm-dDa0M7IxgYbPim1m5WJM
const UPLOADS_ID = 'PLCLLPATZiHLm-dDa0M7IxgYbPim1m5WJM';
const UPLOADS_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${UPLOADS_ID}&key=${API_KEY}&maxResults=${mostRecentCount}`;

// Function to fetch the playlist items
export default async function getPlaylistItems() {
    try {
        const response = await fetch(`${UPLOADS_URL}`);
        if (!response.ok) {
            // throw new Error(`HTTP error! status: ${response.status}`);
            console.log('yt error')
            return false;
        }
        
        const data = await response.json();
        const ids = data.items.map(x => x.snippet.resourceId.videoId);
        return { data: data.items, ids: ids };

    } catch (error) {
        console.error('Error fetching playlist items:', error);
    }
}