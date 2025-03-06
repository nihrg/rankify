import React from 'react';
import { useDrag } from 'react-dnd';
import { Music, Plus } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  duration_ms: number;
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

  return (
    <div
      ref={drag}
      onClick={() => isInPlaylist ? onRemove?.(track) : onAdd?.(track)}
      className={`flex items-center p-4 bg-gray-800 rounded-lg cursor-move group transition-colors ${
        isInPlaylist ? 'bg-purple-900/50 hover:bg-purple-900/40' : 'hover:bg-gray-700'
      } ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <Music className="text-purple-500 mr-4" size={20} />
      <div className="flex-1">
        <h4 className="text-white font-medium">{track.name}</h4>
        <p className="text-gray-400 text-sm">
          {track.artists.map(a => a.name).join(', ')}
        </p>
      </div>
      <span className="text-gray-400 text-sm">
        {formatDuration(track.duration_ms)}
      </span>
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
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
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

export default TrackList