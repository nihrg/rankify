import React, { useState } from 'react';
import { Search, Disc3, Github } from 'lucide-react';
import { Album, Track } from './types';
import { searchAlbums, getAlbumTracks } from './spotify';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableTrack } from './components/SortableTrack';

function App() {
  const [query, setQuery] = useState('');
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchAlbums(query);
      setAlbums(results);
    } catch (error) {
      console.error('Error searching albums:', error);
      setError('Failed to search albums. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAlbum = async (album: Album) => {
    setSelectedAlbum(album);
    setIsLoading(true);
    setError(null);
    try {
      const trackResults = await getAlbumTracks(album.id);
      setTracks(trackResults);
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setError('Failed to fetch album tracks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTracks((tracks) => {
        const oldIndex = tracks.findIndex((track) => track.id === active.id);
        const newIndex = tracks.findIndex((track) => track.id === over.id);
        return arrayMove(tracks, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col items-center mb-12">
          <Disc3 className="w-16 h-16 mb-4 text-purple-400" />
          <h1 className="text-4xl font-bold mb-2">Rankify</h1>
          <p className="text-gray-400">Drag and drop tracks to rank them</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for an album or artist..."
              className="w-full px-4 py-3 pl-12 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-8">
              {error}
            </div>
          )}

          {!selectedAlbum && albums.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {albums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => handleSelectAlbum(album)}
                  className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  <img
                    src={album.images[0].url}
                    alt={album.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{album.name}</h3>
                    <p className="text-gray-400">{album.artists[0].name}</p>
                    <p className="text-sm text-gray-500">{album.release_date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedAlbum && (
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-6 mb-8">
                <img
                  src={selectedAlbum.images[0].url}
                  alt={selectedAlbum.name}
                  className="w-32 h-32 rounded-lg shadow-lg"
                />
                <div>
                  <h2 className="text-2xl font-bold">{selectedAlbum.name}</h2>
                  <p className="text-gray-400">{selectedAlbum.artists[0].name}</p>
                  <button
                    onClick={() => setSelectedAlbum(null)}
                    className="mt-2 text-sm text-purple-400 hover:text-purple-300"
                  >
                    ← Back to search
                  </button>
                </div>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={tracks.map(track => track.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {tracks.map((track, index) => (
                      <SortableTrack
                        key={track.id}
                        track={track}
                        index={index}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p className="text-gray-400">Nihar Guha © 2025</p>
          <a
            href="https://github.com/nihrg/rankify"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>Source Code</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;