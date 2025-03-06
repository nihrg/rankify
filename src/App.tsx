import React, { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Disc3, Users } from 'lucide-react';
import SearchBar from './components/SearchBar';
import AlbumList from './components/AlbumList';
import ArtistList from './components/ArtistList';
import TrackList from './components/TrackList';
import Rankings from './components/Playlist';
import RankingsPage from './pages/Rankings';
import {
  searchAlbums,
  searchArtists,
  searchTracks,
  getAlbumTracks,
  getArtistTopTracks,
} from './api/spotify';

function Search() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [view, setView] = useState('albums');
  const trackSectionRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    if (view === 'albums') {
      const albumResults = await searchAlbums(query);
      setAlbums(albumResults);
      setArtists([]);
    } else {
      const artistResults = await searchArtists(query);
      setArtists(artistResults);
      setAlbums([]);
    }
    setTracks([]);
  };

  const handleAlbumSelect = async (album: any) => {
    const trackResults = await getAlbumTracks(album.id);
    setTracks(trackResults);
    setTimeout(() => {
      trackSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleArtistSelect = async (artist: any) => {
    const trackResults = await getArtistTopTracks(artist.id);
    setTracks(trackResults);
    setTimeout(() => {
      trackSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAddToPlaylist = (track: any) => {
    setPlaylist((currentPlaylist) => {
      if (!currentPlaylist.some((t) => t.id === track.id)) {
        return [...currentPlaylist, track];
      }
      return currentPlaylist;
    });
  };

  const handleRemoveFromPlaylist = (track: any) => {
    setPlaylist((currentPlaylist) => 
      currentPlaylist.filter((t) => t.id !== track.id)
    );
  };

  const handleReorderPlaylist = (dragIndex: number, hoverIndex: number) => {
    setPlaylist((currentPlaylist) => {
      const newPlaylist = [...currentPlaylist];
      const draggedTrack = newPlaylist[dragIndex];
      newPlaylist.splice(dragIndex, 1);
      newPlaylist.splice(hoverIndex, 0, draggedTrack);
      return newPlaylist;
    });
  };

  const handleNext = () => {
    navigate('/rankings', { state: { tracks: playlist } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Rankify</h1>
          <p className="text-gray-400">Drag tracks to create your perfect ranking</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setView('albums')}
              className={`flex items-center px-6 py-2 rounded-full ${
                view === 'albums'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Disc3 size={20} className="mr-2" />
              Albums
            </button>
            <button
              onClick={() => setView('artists')}
              className={`flex items-center px-6 py-2 rounded-full ${
                view === 'artists'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users size={20} className="mr-2" />
              Artists
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <SearchBar onSearch={handleSearch} view={view} />
        </div>

        <div className="mb-12">
          {view === 'albums' && albums.length > 0 && (
            <AlbumList albums={albums} onSelect={handleAlbumSelect} />
          )}
          {view === 'artists' && artists.length > 0 && (
            <ArtistList artists={artists} onSelect={handleArtistSelect} />
          )}
        </div>

        {tracks.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" ref={trackSectionRef}>
            <div className="lg:sticky lg:top-8">
              <Rankings
                tracks={playlist}
                onAdd={handleAddToPlaylist}
                onRemove={handleRemoveFromPlaylist}
                onReorder={handleReorderPlaylist}
                onNext={handleNext}
              />
            </div>
            <div>
              <TrackList
                tracks={tracks}
                playlist={playlist}
                onAdd={handleAddToPlaylist}
                onRemove={handleRemoveFromPlaylist}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/rankings" element={<RankingsPage />} />
      </Routes>
    </DndProvider>
  );
}

export default App;