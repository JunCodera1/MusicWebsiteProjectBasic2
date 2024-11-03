import axios from "axios";

const client_id = 'bd4f17ae0bb04c23a6a490f9c16518fa';
const client_secret = 'a1341beb310f4c32958e129935529d14';
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

const playTrack = async (trackUri, deviceId, token) => {
  await axios.put(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    {
      uris: [trackUri],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { searchTracks, playTrack, getToken };
