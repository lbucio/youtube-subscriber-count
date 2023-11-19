// Import React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Define a custom component that fetches and displays the subscriber count
class SubscriberCount extends React.Component {
    // Initialize the state with a default value
    constructor(props) {
        super(props);
        this.state = {
            count: 'Loading...'
        };
    }

    // Fetch the subscriber count from the YouTube API when the component mounts
    componentDidMount() {
        const channelId = 'UCxJXJmk3H3H3fxYiCr3VD8A';
        const apiKey = process.env.REACT_APP_API_KEY;
        const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
        fetch(url)
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                // Extract the subscriber count from the data
                const count = data.items[0].statistics.subscriberCount;
                // Update the state with the count
                this.setState({ count });
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
                // Update the state with an error message
                this.setState({ count: 'Error' });
            });
    }

    // Render the subscriber count as a white bold text
    render() {
        return (
            <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                {this.state.count}
            </h1>
        );
    }
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
