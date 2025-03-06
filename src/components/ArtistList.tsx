import React from 'react';
import { User } from 'lucide-react';

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  followers: { total: number };
}

interface ArtistListProps {
  artists: Artist[];
  onSelect: (artist: Artist) => void;
}

const ArtistList: React.FC<ArtistListProps> = ({ artists, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {artists.map((artist) => (
        <div
          key={artist.id}
          onClick={() => onSelect(artist)}
          className="bg-gray-800 rounded-lg p-4 cursor-pointer transform hover:scale-105 transition-transform"
        >
          {artist.images[0] ? (
            <img
              src={artist.images[0].url}
              alt={artist.name}
              className="w-full aspect-square object-cover rounded-lg mb-4"
            />
          ) : (
            <div className="w-full aspect-square bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
              <User size={48} className="text-gray-500" />
            </div>
          )}
          <h3 className="text-white font-semibold truncate">{artist.name}</h3>
          <p className="text-gray-400 text-sm">
            {artist.followers.total.toLocaleString()} followers
          </p>
        </div>
      ))}
    </div>
  );
};

export default ArtistList;