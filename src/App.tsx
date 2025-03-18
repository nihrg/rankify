import React, { useState, useRef, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Disc3, Users, Github, LogOut, ArrowLeft, Music2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchBar from './components/SearchBar';
import AlbumList from './components/AlbumList';
import ArtistList from './components/ArtistList';
import TrackList from './components/TrackList';
import Rankings from './components/Playlist';
import RankingsPage from './pages/Rankings';
import Start from './pages/Start';
import Callback from './pages/Callback';
import Logo from './components/Logo';
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const loadingTimeout = useRef<NodeJS.Timeout>();
  const trackListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
      }
    };
  }, []);

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
      setIsLoading(true);
      setTracks([]);
      setSelectedArtistId(null);

      if (view === 'albums') {
        const albumResults = await searchAlbums(query);
        setAlbums(albumResults);
        setArtists([]);
        setTracks([]);
      } else if (view === 'artists') {
        const artistResults = await searchArtists(query);
        setArtists(artistResults);
        setAlbums([]);
        setTracks([]);
      } else if (view === 'songs') {
        const trackResults = await searchTracks(query);
        setTracks(trackResults);
        setAlbums([]);
        setArtists([]);
      }
    } catch (err) {
      if (err instanceof Error && err.message === 'Authentication required') {
        setError('Please sign in with Spotify to search for music');
      } else {
        setError('An error occurred while searching. Please try again.');
      }
      setAlbums([]);
      setArtists([]);
      setTracks([]);
      setSelectedArtistId(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlbumSelect = async (album: any) => {
    if (isLoading) return;
    
    try {
      setError(null);
      setIsLoading(true);
      setTracks([]);
      setSelectedArtistId(null);
      
      const trackResults = await getAlbumTracks(album.id);
      setTracks(trackResults);
    } catch (err) {
      if (err instanceof Error && err.message === 'Authentication required') {
        setError('Please sign in with Spotify to view tracks');
      } else {
        setError('An error occurred while loading tracks. Please try again.');
      }
      setTracks([]);
    } finally {
      loadingTimeout.current = setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const handleArtistSelect = async (artist: any) => {
    if (isLoading) return;
    
    try {
      setError(null);
      setIsLoading(true);
      setTracks([]);
      setSelectedArtistId(artist.id);
      
      const trackResults = await getArtistTopTracks(artist.id);
      setTracks(trackResults);
    } catch (err) {
      if (err instanceof Error && err.message === 'Authentication required') {
        setError('Please sign in with Spotify to view tracks');
      } else {
        setError('An error occurred while loading tracks. Please try again.');
      }
      setTracks([]);
      setSelectedArtistId(null);
    } finally {
      loadingTimeout.current = setTimeout(() => {
        setIsLoading(false);
      }, 500);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2070')] bg-cover bg-center bg-fixed">
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`,
        }}
      />
      <div className="min-h-screen backdrop-blur-xl bg-black/70">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="fixed w-2 h-2 bg-purple-500/20 rounded-full pointer-events-none"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        <motion.div 
          className="container mx-auto px-4 py-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="flex flex-col gap-8 mb-12" variants={itemVariants}>
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-400 hover:text-white transition-colors group"
              >
                <ArrowLeft className="mr-2 group-hover:scale-110 transition-transform" size={24} />
                <span>Back to Sign In</span>
              </button>
              {user && (
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">
                    {user.display_name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-400 hover:text-white transition-colors group"
                  >
                    <LogOut size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
                    Logout
                  </button>
                </div>
              )}
            </div>
            
            <motion.div 
              className="flex items-center justify-center gap-4"
              animate={floatingAnimation}
            >
              <Logo size="lg" />
              <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
                Rankify
              </h1>
            </motion.div>
          </motion.div>

          {error && (
            <motion.div 
              className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center backdrop-blur-sm"
              variants={itemVariants}
            >
              <p className="text-red-400">{error}</p>
            </motion.div>
          )}

          <motion.div className="text-center mb-12" variants={itemVariants}>
            <p className="text-gray-400">Drag tracks to create your perfect ranking</p>
          </motion.div>

          <motion.div className="flex justify-center mb-8" variants={itemVariants}>
            <div className="flex space-x-4 bg-gray-800/80 backdrop-blur-sm rounded-full p-1">
              <button
                onClick={() => setView('albums')}
                className={`flex items-center px-6 py-2 rounded-full transition-all duration-300 ${
                  view === 'albums'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Disc3 size={20} className="mr-2" />
                Albums
              </button>
              <button
                onClick={() => setView('artists')}
                className={`flex items-center px-6 py-2 rounded-full transition-all duration-300 ${
                  view === 'artists'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Users size={20} className="mr-2" />
                Artists
              </button>
              <button
                onClick={() => setView('songs')}
                className={`flex items-center px-6 py-2 rounded-full transition-all duration-300 ${
                  view === 'songs'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Music2 size={20} className="mr-2" />
                Songs
              </button>
            </div>
          </motion.div>

          <motion.div className="flex justify-center mb-12" variants={itemVariants}>
            <SearchBar onSearch={handleSearch} view={view} />
          </motion.div>

          <motion.div className="mb-12" variants={itemVariants}>
            {view === 'albums' && albums.length > 0 && (
              <AlbumList albums={albums} onSelect={handleAlbumSelect} isLoading={isLoading} />
            )}
            {view === 'artists' && artists.length > 0 && (
              <ArtistList artists={artists} onSelect={handleArtistSelect} isLoading={isLoading} />
            )}
          </motion.div>

          {(tracks.length > 0 || isLoading) && (
            <motion.div 
              ref={trackListRef}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={itemVariants}
            >
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
                {isLoading ? (
                  <div className="flex items-center justify-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
                  </div>
                ) : (
                  <TrackList
                    tracks={tracks}
                    playlist={playlist}
                    onAdd={handleAddToPlaylist}
                    onRemove={handleRemoveFromPlaylist}
                    artistId={selectedArtistId}
                  />
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
        <motion.footer 
          className="py-4 mt-auto border-t border-white/10"
          variants={itemVariants}
        >
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
        </motion.footer>
      </div>
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