// Import React and ReactDOM libraries
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Define a custom component that fetches and displays the subscriber count
const SubscriberCount = () => {
    const [count, setCount] = useState('Loading...')
    const [videoCount, setVideoCount] = useState('')
    const [viewCount, setViewCount] = useState('')
    const channelId = 'UCxJXJmk3H3H3fxYiCr3VD8A';
    const apiKey = process.env.REACT_APP_API_KEY;
    
    useEffect(() => {
        const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
        fetch(url)
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                // Extract the subscriber count from the data
                const statistics = data.items[0].statistics;
                const count = statistics.subscriberCount;
                const { videoCount } = statistics;
                const { viewCount } = statistics;
                // Update the state with the count
                setCount(count);
                setVideoCount(videoCount)
                setViewCount(viewCount)
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
                // Update the state with an error message
                setCount('Error');
            });
    }, [apiKey])

    return (
        <>
            <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                {count}
            </h1>
            <h2>Subscribers</h2>
            <div className='sub-stats'>
                <div>Videos: {videoCount}</div>
                <div>Views: {viewCount}</div>
            </div>
        </>
    );
}

// Define the main app component that renders the subscriber count component
function App() {
    // Use inline styles to set the background color to white
    return (
        <SubscriberCount />
    );
}

// Render the app component to the root element
ReactDOM.render(<App />, document.getElementById('root'));
