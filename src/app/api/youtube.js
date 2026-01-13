// Replace with your actual API key and Playlist ID
const API_KEY = process.env.YT_API_KEY;
const PLAYLIST_ID = process.env.VV_UC;

const mostRecentCount = 6;

// The API endpoint URL for listing playlist items
// 'part=snippet,contentDetails' requests necessary information like video titles and IDs
// 'maxResults=50' retrieves the maximum number of items per page
// const API_URL = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&channelId=${PLAYLIST_ID}&part=snippet,contentDetails`;

const SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${PLAYLIST_ID}&order=date&type=video&key=${API_KEY}&maxResults=50`; // &maxResults=6
const VIDEOS_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&channelId=${PLAYLIST_ID}&key=${API_KEY}&id=`;
// const UPLOADS_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${UPLOADS_ID}&key=${API_KEY}&maxResults=6`
// const UPLOADS_URL = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&key=${API_KEY}&id=${PLAYLIST_ID}`;

let trueUploads = [];

// Function to fetch the playlist items
export default async function getPlaylistItems(token) {
    try {
        const response = await fetch(`${SEARCH_URL}${token ? '&pageToken=' + token : ''}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const ids = data.items.map(x => x.id.videoId);
        let npToken = data.nextPageToken;

        try {
            const response = await fetch(`${VIDEOS_URL}${ids.join(',')}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            let uploads = data.items.filter(x => !x.liveStreamingDetails);

            uploads.forEach((vid) => {
                if (trueUploads.length < mostRecentCount) {
                    trueUploads.push(vid);
                }
            });

            if (trueUploads.length < mostRecentCount) {
                getPlaylistItems(npToken);
                return;
            }
            else {
                return trueUploads;
            }

        } catch (error) {
            console.error('Error fetching playlist items:', error);
        }

    } catch (error) {
        console.error('Error fetching playlist items:', error);
    }
}