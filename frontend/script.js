const API_KEY = 'AIzaSyCM8Tji7ogdCj5mNryqUYDYlhafqCQG17o'
const VIDEO_ID = 'nu_pCVPKzTk' 

const APILINK = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${VIDEO_ID}&key=${API_KEY}'
const MAX_RESULTS = 20;

// Function to search for videos
async function searchVideos() {
    console.log("work");
    const query = document.getElementById('query').value;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${MAX_RESULTS}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displaySearchResults(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Function to display search results
function displaySearchResults(data) {
    const searchResults = document.getElementById('section');
    searchResults.innerHTML = ''; // Clear previous results

    if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const title = item.snippet.title;
            const description = item.snippet.description;
            const thumbnailUrl = item.snippet.thumbnails.default.url;

            const row_div = document.createElement('div');
            const column_div = document.createElement('div');
            const card = document.createElement('div');
            const image = document.createElement('image');
            const center = document.createElement('center');
            const head_title = document.createElement('h3');
            
            center.appendChild(image);
            card.appendChild(center);
            card.appendChild(head_title);
            head_title.setAttribute('id', 'title');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');
            card.setAttribute('class', 'card');
            column_div.appendChild(card);
            column_div.setAttribute('class', 'column');
            row_div.appendChild(column_div);
            row_div.setAttribute('class', 'row');

            image.innerHTML = `<img src="${thumbnailUrl}" alt="Thumbnail">`;
            head_title.innerHTML = `${title}<br><a href="video.html?id=${videoId}&title=${title}&">reviews</a></br>`;

            searchResults.appendChild(row_div);
        });
    } else {
        searchResults.innerHTML = '<p>No search results found.</p>';
    }
}

document.getElementById('query').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchVideos();
        document.getElementById('query').value = '';
    }
});

