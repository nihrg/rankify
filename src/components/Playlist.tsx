import React, { useRef } from 'react';
import { useDrop, useDrag, XYCoord } from 'react-dnd';
import { GripVertical, X, ArrowRight, ArrowUp, Trash2 } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
}

interface RankingsProps {
  tracks: Track[];
  onAdd: (track: Track) => void;
  onRemove: (track: Track) => void;
  onNext: () => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
  onClear: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const RankingItem = ({ 
  track, 
  index, 
  onRemove, 
  moveTrack 
}: { 
  track: Track; 
  index: number; 
  onRemove: (track: Track) => void;
  moveTrack: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'ranking-item',
    item: () => ({ type: 'ranking-item', id: track.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ranking-item',
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveTrack(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center p-4 bg-gray-700 rounded-lg group ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <GripVertical
        className="text-gray-500 mr-2 cursor-move"
        size={20}
      />
      <span className="text-gray-400 mr-4 font-mono">{(index + 1).toString().padStart(2, '0')}</span>
      <div className="flex-1">
        <h4 className="text-white font-medium">{track.name}</h4>
        <p className="text-gray-400 text-sm">
          {track.artists.map((a) => a.name).join(', ')}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(track);
        }}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-white transition-opacity"
      >
        <X size={20} />
      </button>
    </div>
  );
};

const Rankings: React.FC<RankingsProps> = ({
  tracks,
  onAdd,
  onRemove,
  onNext,
  onReorder,
  onClear,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'track',
    drop: (item: { type: string; track: Track }) => {
      if (item.type === 'track') {
        onAdd(item.track);
      }
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      ref={drop}
      className={`bg-gray-800 rounded-lg p-6 ${
        isOver ? 'ring-2 ring-purple-500' : ''
      }`}
    >
      <button
        onClick={scrollToTop}
        className="flex items-center text-gray-400 hover:text-white mb-4 transition-colors"
      >
        <ArrowUp size={20} className="mr-2" />
        Back to Search
      </button>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your Rankings</h2>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">({tracks.length} tracks)</span>
          {tracks.length > 0 && (
            <button
              onClick={onClear}
              className="flex items-center text-gray-400 hover:text-red-400 transition-colors"
              title="Clear all tracks"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>

      {tracks.length === 0 ? (
        <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-700 rounded-lg">
          Drag songs here to start ranking them
        </div>
      ) : (
        <>
          <div className="space-y-2 mb-6">
            {tracks.map((track, index) => (
              <RankingItem
                key={`${track.id}-${index}`}
                track={track}
                index={index}
                onRemove={onRemove}
                moveTrack={onReorder}
              />
            ))}
          </div>

          <button
            onClick={onNext}
            className="w-full flex items-center justify-center py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ArrowRight size={20} className="mr-2" />
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Rankings;