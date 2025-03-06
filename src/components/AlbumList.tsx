import React from 'react';
import { Disc3 } from 'lucide-react';

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
  release_date: string;
}

interface AlbumListProps {
  albums: Album[];
  onSelect: (album: Album) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({ albums, onSelect }) => {
  const getYear = (date: string) => {
    return date.split('-')[0];
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {albums.map((album) => (
        <div
          key={album.id}
          onClick={() => onSelect(album)}
          className="bg-gray-800 rounded-lg p-4 cursor-pointer transform hover:scale-105 transition-transform"
        >
          {album.images[0] ? (
            <img
              src={album.images[0].url}
              alt={album.name}
              className="w-full aspect-square object-cover rounded-lg mb-4"
            />
          ) : (
            <div className="w-full aspect-square bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
              <Disc3 size={48} className="text-gray-500" />
            </div>
          )}
          <h3 className="text-white font-semibold truncate">{album.name}</h3>
          <p className="text-gray-400 text-sm truncate mb-1">
            {album.artists.map(a => a.name).join(', ')}
          </p>
          <p className="text-purple-400 text-sm font-medium">
            {getYear(album.release_date)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;