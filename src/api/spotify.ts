import axios from 'axios';
import { getAccessToken } from '../utils/spotify';

export const searchAlbums = async (query: string) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.albums.items;
};

export const searchArtists = async (query: string) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.artists.items;
};

export const searchTracks = async (query: string) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.tracks.items;
};

export const getArtistTopTracks = async (artistId: string) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.tracks;
};

export const getAlbumTracks = async (albumId: string) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/albums/${albumId}/tracks`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.items;
};