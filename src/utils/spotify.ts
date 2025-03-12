import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

export const getAccessToken = async () => {
  const token = localStorage.getItem('spotify_token');
  if (token) return token;

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const loginWithSpotify = () => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-modify-public',
    'playlist-modify-private'
  ].join(' ');

  const state = Math.random().toString(36).substring(2, 15);
  localStorage.setItem('spotify_auth_state', state);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: scopes,
    state: state,
    show_dialog: 'true'
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const handleCallback = () => {
  if (!window.location.hash) return null;

  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  
  const token = params.get('access_token');
  const state = params.get('state');
  const storedState = localStorage.getItem('spotify_auth_state');

  if (!token || state !== storedState) {
    console.error('Invalid state or missing token');
    return null;
  }

  localStorage.removeItem('spotify_auth_state');
  localStorage.setItem('spotify_token', token);
  return token;
};

export const getUserProfile = async () => {
  const token = localStorage.getItem('spotify_token');
  if (!token) return null;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    localStorage.removeItem('spotify_token');
    return null;
  }
};

export const searchAlbums = async (query: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authentication required');
  
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.albums.items;
};

export const searchArtists = async (query: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authentication required');

  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.artists.items;
};

export const searchTracks = async (query: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authentication required');

  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.tracks.items;
};

export const getArtistTopTracks = async (artistId: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authentication required');

  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.tracks;
};

export const getAlbumTracks = async (albumId: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authentication required');

  const response = await axios.get(
    `https://api.spotify.com/v1/albums/${albumId}/tracks`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.items;
};

export const savePlaylistToSpotify = async (name: string, trackUris: string[]) => {
  const token = localStorage.getItem('spotify_token');
  if (!token) throw new Error('Authentication required');

  try {
    const user = await getUserProfile();
    if (!user) throw new Error('Could not fetch user profile');

    const playlistResponse = await axios.post(
      `https://api.spotify.com/v1/users/${user.id}/playlists`,
      { name, public: true },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistResponse.data.id}/tracks`,
      { uris: trackUris },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return playlistResponse.data;
  } catch (error) {
    console.error('Error saving playlist:', error);
    throw error;
  }
};