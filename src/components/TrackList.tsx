import React from 'react';
import { useDrag } from 'react-dnd';
import { Music, Plus } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  duration_ms: number;
  popularity: number;
}

interface TrackListProps {
  tracks: Track[];
  playlist?: Track[];
  onAdd?: (track: Track) => void;
  onRemove?: (track: Track) => void;
}

const TrackItem: React.FC<{ 
  track: Track; 
  isInPlaylist: boolean; 
  onAdd?: (track: Track) => void; 
  onRemove?: (track: Track) => void;
}> = ({
  track,
  isInPlaylist,
  onAdd,
  onRemove
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'track',
    item: { type: 'track', track },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatPopularity = (popularity: number) => {
    const streams = Math.pow(10, (popularity / 20)) * 1000;
    if (streams >= 1000000) {
      return `${(streams / 1000000).toFixed(1)}M streams`;
    } else if (streams >= 1000) {
      return `${(streams / 1000).toFixed(1)}K streams`;
    }
    return `${Math.round(streams)} streams`;
  };

  return (
    <div
      ref={drag}
      onClick={() => isInPlaylist ? onRemove?.(track) : onAdd?.(track)}
      className={`flex items-center p-4 bg-gray-800/80 backdrop-blur-sm rounded-lg cursor-move group transition-all duration-300 ${
        isInPlaylist 
          ? 'bg-purple-900/50 hover:bg-purple-900/40 hover:scale-[0.99]' 
          : 'hover:bg-gray-700/80 hover:scale-[1.02]'
      } ${isDragging ? 'opacity-50 scale-105' : 'opacity-100'}`}
    >
      <Music className="text-purple-500 mr-4 transition-transform group-hover:scale-110" size={20} />
      <div className="flex-1">
        <h4 className="text-white font-medium">{track.name}</h4>
        <p className="text-gray-400 text-sm">
          {track.artists.map(a => a.name).join(', ')}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-400 text-sm">
          {formatPopularity(track.popularity)}
        </span>
        <span className="text-gray-400 text-sm">
          {formatDuration(track.duration_ms)}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isInPlaylist 
            ? 'bg-red-400/10 text-red-400 opacity-0 group-hover:opacity-100' 
            : 'bg-purple-500/10 text-purple-400'
        }`}>
          {isInPlaylist ? '×' : '+'}
        </div>
      </div>
    </div>
  );
};

const TrackList: React.FC<TrackListProps> = ({ tracks, playlist = [], onAdd, onRemove }) => {
  const handleSelectAll = () => {
    const unselectedTracks = tracks.filter(track => !playlist.some(p => p.id === track.id));
    unselectedTracks.forEach(track => onAdd?.(track));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Available Tracks</h3>
        <button
          onClick={handleSelectAll}
          className="px-4 py-2 bg-purple-600/90 backdrop-blur-sm text-white rounded-lg hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-600/25 transition-all duration-300 active:scale-95 transform-gpu flex items-center group"
        >
          <Plus size={20} className="mr-2 transition-transform group-hover:rotate-180" />
          Select All
        </button>
      </div>
      <div className="space-y-2">
        {tracks.map((track) => (
          <TrackItem
            key={track.id}
            track={track}
            isInPlaylist={playlist.some((t) => t.id === track.id)}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackList;