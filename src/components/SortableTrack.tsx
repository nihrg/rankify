import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Music4 } from 'lucide-react';
import { Track } from '../types';

interface SortableTrackProps {
  track: Track;
  index: number;
}

export function SortableTrack({ track, index }: SortableTrackProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: track.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 bg-gray-700 rounded-lg ${
        isDragging ? 'opacity-50 border-2 border-purple-500' : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        <button
          className="cursor-grab hover:text-purple-400 focus:outline-none"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-5 h-5" />
        </button>
        <div className="w-8 text-center text-gray-400">{index + 1}</div>
        <Music4 className="w-5 h-5 text-gray-400" />
        <div>
          <p className="font-medium">{track.name}</p>
          <p className="text-sm text-gray-400">
            {formatDuration(track.duration_ms)}
          </p>
        </div>
      </div>
      <div className="text-purple-400 font-semibold">
        {track.preview_url && (
          <audio
            src={track.preview_url}
            controls
            className="h-8 w-32 md:w-48"
          />
        )}
      </div>
    </div>
  );
}