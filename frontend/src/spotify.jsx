import axios from "axios";

const client_id = import.meta.env.CLIENT_ID_SPOTIFY;
const client_secret = import.meta.env.CLIENT_SECRET_SPOTIFY;
const redirect_uri = "http://localhost:5173/callback";

const getToken = async () => {
  const response = await axios.post("https://accounts.spotify.com/api/token", {
    grant_type: "client_credentials",
    client_id,
    client_secret,
  });
  return response.data.access_token;
};

const searchTracks = async (query) => {
  const token = await getToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${query}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.tracks.items;
};

export { searchTracks };
