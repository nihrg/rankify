import React, { useState, useRef, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Disc3, Users, Github, LogOut, ArrowLeft } from 'lucide-react';
import SearchBar from './components/SearchBar';
import AlbumList from './components/AlbumList';
import ArtistList from './components/ArtistList';
import TrackList from './components/TrackList';
import Rankings from './components/Playlist';
import RankingsPage from './pages/Rankings';
import Start from './pages/Start';
import Callback from './pages/Callback';
import { searchAlbums, searchArtists, searchTracks, getAlbumTracks, getArtistTopTracks, getUserProfile } from './utils/spotify';

function Search() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [view, setView] = useState('albums');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const trackSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const profile = await getUserProfile();
      setUser(profile);
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('spotify_token');
    setUser(null);
    navigate('/');
  };

  const handleSearch = async (query: string) => {
    try {
      setError(null);
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
    } catch (err) {
      if (err instanceof Error && err.message === 'Authentication required') {
        setError('Please sign in with Spotify to search for music');
      } else {
        setError('An error occurred while searching. Please try again.');
      }
      setAlbums([]);
      setArtists([]);
      setTracks([]);
    }
  };

  const scrollToTracks = () => {
    if (trackSectionRef.current) {
      const yOffset = -45;
      const element = trackSectionRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleAlbumSelect = async (album: any) => {
    try {
      setError(null);
      const trackResults = await getAlbumTracks(album.id);
      setTracks(trackResults);
      setTimeout(scrollToTracks, 100);
    } catch (err) {
      if (err instanceof Error && err.message === 'Authentication required') {
        setError('Please sign in with Spotify to view tracks');
      } else {
        setError('An error occurred while loading tracks. Please try again.');
      }
      setTracks([]);
    }
  };

  const handleArtistSelect = async (artist: any) => {
    try {
      setError(null);
      const trackResults = await getArtistTopTracks(artist.id);
      setTracks(trackResults);
      setTimeout(scrollToTracks, 100);
    } catch (err) {
      if (err instanceof Error && err.message === 'Authentication required') {
        setError('Please sign in with Spotify to view tracks');
      } else {
        setError('An error occurred while loading tracks. Please try again.');
      }
      setTracks([]);
    }
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

  const handleClearPlaylist = () => {
    setPlaylist([]);
  };

  const handleNext = () => {
    navigate('/rankings', { state: { tracks: playlist } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="mr-2 group-hover:scale-110 transition-transform" size={24} />
              <span>Back to Sign In</span>
            </button>
          </div>
          <h1 className="text-4xl font-bold text-center flex-1">Rankify</h1>
          <div className="flex-1 flex justify-end">
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-gray-400">
                  {user.display_name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <LogOut size={20} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="text-center mb-12">
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
                onClear={handleClearPlaylist}
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
      <footer className="py-4 mt-auto border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <span className="text-white/40 text-sm">
              Rankify © 2025
            </span>
            <a
              href="https://github.com/nihrg/rankify"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white/40 hover:text-white/60 transition-colors group"
            >
              <Github size={14} className="mr-1.5" />
              <span className="text-sm">Source Code</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/search" element={<Search />} />
        <Route path="/rankings" element={<RankingsPage />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </DndProvider>
  );
}

export default App;