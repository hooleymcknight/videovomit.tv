// Replace with your actual API key and Playlist ID
const API_KEY = process.env.YT_API_KEY;
const mainPlaylistId = process.env.VV_UC;
const archivePlaylistId = process.env.VV_ARCHIVE_UC;

const mostRecentCount = 6;

// The API endpoint URL for listing playlist items
// 'part=snippet,contentDetails' requests necessary information like video titles and IDs
// 'maxResults=50' retrieves the maximum number of items per page
// const API_URL = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&channelId=${PLAYLIST_ID}&part=snippet,contentDetails`;
// const UPLOADS_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${UPLOADS_ID}&key=${API_KEY}&maxResults=6`
// const UPLOADS_URL = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&key=${API_KEY}&id=${PLAYLIST_ID}`;

let trueUploads = [];
let mainUploads = [];
let archiveUploads = [];

// Function to fetch the playlist items
export default async function getPlaylistItems(playlist, token) {
    if (!playlist.length) playlist = mainPlaylistId;
    const SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${playlist}&order=date&type=video&key=${API_KEY}&maxResults=50`; // &maxResults=6
    const VIDEOS_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&channelId=${playlist}&key=${API_KEY}&id=`;

    try {
        const response = await fetch(`${SEARCH_URL}${token ? '&pageToken=' + token : ''}`);
        if (!response.ok) {
            throw new Error(`HTTP error! search status: ${response.status}`);
        }
        
        const data = await response.json();
        const ids = data.items.map(x => x.id.videoId);
        let npToken = data.nextPageToken || null;

        try {
            const response = await fetch(`${VIDEOS_URL}${ids.join(',')}`);
            if (!response.ok) {
                throw new Error(`HTTP error! video status: ${response.status}`);
            }
            
            const data = await response.json();
            let uploads = data.items.filter(x => !x.liveStreamingDetails);

            uploads.forEach((vid) => {
                if (!trueUploads.includes(vid)) {
                    if (playlist === mainPlaylistId && mainUploads.length < mostRecentCount) {
                        mainUploads.push(vid);
                        trueUploads.push(vid);
                    }
                    else if (playlist === archivePlaylistId && archiveUploads.length < mostRecentCount) {
                        archiveUploads.push(vid);
                        trueUploads.push(vid);
                    }
                }
            });

            if (playlist === mainPlaylistId && mainUploads.length < mostRecentCount) {
                getPlaylistItems(playlist, npToken);
                return;
            }
            else if (playlist === archivePlaylistId && archiveUploads.length < mostRecentCount) {
                getPlaylistItems(playlist, npToken);
                return;
            }
            else if (mainUploads.length >= mostRecentCount && archiveUploads.length < mostRecentCount) {
                getPlaylistItems(archivePlaylistId, npToken)
            }
            else {
                // we are ready to return the true uploads. sort it by date and trim back down to 6.

                return trueUploads;
            }

        } catch (error) {
            console.error('Error fetching playlist items:', error);
        }

    } catch (error) {
        console.error('Error fetching playlist items:', error);
    }
}