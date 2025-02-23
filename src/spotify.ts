import axios from 'axios';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

const getAccessToken = async () => {
  if (accessToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
    return accessToken;
  }

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
      }
    );

    accessToken = response.data.access_token;
    tokenExpirationTime = Date.now() + (response.data.expires_in * 1000);
    return accessToken;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
};

export const searchAlbums = async (query: string) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.albums.items;
};

export const getAlbumTracks = async (albumId: string) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/albums/${albumId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.items;
};