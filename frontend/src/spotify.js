import axios from 'axios';

const client_id = 'YOUR_CLIENT_ID';
const client_secret = 'YOUR_CLIENT_SECRET';
const redirect_uri = 'YOUR_REDIRECT_URI';

const getToken = async () => {
    const response = await axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'client_credentials',
        client_id,
        client_secret,
    });
    return response.data.access_token;
};

const searchTracks = async (query) => {
    const token = await getToken();
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.tracks.items;
};

export { searchTracks };