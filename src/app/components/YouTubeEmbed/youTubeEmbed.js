'use client';
import { useState, useEffect } from "react";

//
const embedVideo = (id, title) => {
    return `<iframe width="533" height="300"
        src="https://www.youtube.com/embed/${id}"
        title="${title}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
    </iframe>`
};

export default function YouTubeEmbed (props) {

    function displayPlaylistItems(items) {
        const listElement = document.getElementById('playlist-items');
        if (items && items.length > 0) {
            items.forEach(item => {
                const title = item.snippet.title;
                const videoId = item.id.videoId || item.id || item.snippet.resourceId.videoId;
                const li = document.createElement('li');
                // Create a link to the video
                const a = document.createElement('a');
                a.href = `https://www.youtube.com/watch?v=${videoId}`;
                a.textContent = title;
                a.target = '_blank'; // Open in new tab
                li.innerHTML = embedVideo(videoId, title);
                listElement.appendChild(li);
            });
        } else {
            listElement.innerHTML = '<li>No videos found in this playlist.</li>';
        }
    }

    useEffect(() => {
        if (!document.querySelectorAll('#playlist-items *').length) {
            displayPlaylistItems(props.items);
        }
    }, []);

    return (
        <div className="yt-uploads">
            <div id="playlist-items"></div>
        </div>
    );
}