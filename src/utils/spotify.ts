import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

export const getAccessToken = async () => {
  try {
    const token = localStorage.getItem('spotify_token');
    if (token) return token;

    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }).toString();

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      params,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    if (!response.data || typeof response.data.access_token !== 'string') {
      throw new Error('Invalid token response');
    }

    const accessToken = response.data.access_token;
    localStorage.setItem('spotify_token', accessToken);
    return accessToken;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error getting access token:', error.message);
    } else {
      console.error('Error getting access token:', error);
    }
    localStorage.removeItem('spotify_token');
    throw new Error('Authentication required');
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

interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

interface SpotifyUser {
  id: string;
  display_name: string | null;
  email: string | null;
  images: SpotifyImage[];
  product?: string;
  type: string;
  uri: string;
}

export const getUserProfile = async (): Promise<SpotifyUser | null> => {
  try {
    const token = localStorage.getItem('spotify_token');
    if (!token) return null;

    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { 
      id, 
      display_name, 
      email, 
      images = [], 
      product, 
      type, 
      uri 
    } = response.data;

    return {
      id,
      display_name,
      email,
      images: images.map(({ url, height, width }: SpotifyImage) => ({ 
        url, 
        height: height || null, 
        width: width || null 
      })),
      product,
      type,
      uri
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching user profile:', error.message);
    } else {
      console.error('Error fetching user profile:', error);
    }
    localStorage.removeItem('spotify_token');
    return null;
  }
};

export const searchAlbums = async (query: string) => {
  try {
    const token = await getAccessToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.albums.items;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error searching albums:', error.message);
    } else {
      console.error('Error searching albums:', error);
    }
    throw new Error('Failed to search albums');
  }
};

export const searchArtists = async (query: string) => {
  try {
    const token = await getAccessToken();
    if (!token) throw new Error('Authentication required');

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.artists.items;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error searching artists:', error.message);
    } else {
      console.error('Error searching artists:', error);
    }
    throw new Error('Failed to search artists');
  }
};

export const searchTracks = async (query: string) => {
  try {
    const token = await getAccessToken();
    if (!token) throw new Error('Authentication required');

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.tracks.items;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error searching tracks:', error.message);
    } else {
      console.error('Error searching tracks:', error);
    }
    throw new Error('Failed to search tracks');
  }
};

export const getArtistTopTracks = async (artistId: string) => {
  try {
    const token = await getAccessToken();
    if (!token) throw new Error('Authentication required');

    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.tracks;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching artist top tracks:', error.message);
    } else {
      console.error('Error fetching artist top tracks:', error);
    }
    throw new Error('Failed to fetch artist top tracks');
  }
};

export const getAlbumTracks = async (albumId: string) => {
  try {
    const token = await getAccessToken();
    if (!token) throw new Error('Authentication required');

    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.items;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching album tracks:', error.message);
    } else {
      console.error('Error fetching album tracks:', error);
    }
    throw new Error('Failed to fetch album tracks');
  }
};

export const savePlaylistToSpotify = async (name: string, trackUris: string[]) => {
  try {
    const token = localStorage.getItem('spotify_token');
    if (!token) throw new Error('Authentication required');

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
    if (error instanceof Error) {
      console.error('Error saving playlist:', error.message);
    } else {
      console.error('Error saving playlist:', error);
    }
    throw new Error('Failed to save playlist');
  }
};