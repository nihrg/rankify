import React from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const artistVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {artists.map((artist) => (
        <motion.div
          key={artist.id}
          onClick={() => onSelect(artist)}
          className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 cursor-pointer hover:bg-gray-700/90 transition-colors duration-300 group"
          variants={artistVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {artist.images[0] ? (
              <div className="relative overflow-hidden rounded-lg mb-4">
                <motion.img
                  src={artist.images[0].url}
                  alt={artist.name}
                  className="w-full aspect-square object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors duration-300"
                  initial={false}
                />
              </div>
            ) : (
              <div className="w-full aspect-square bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                <User size={48} className="text-gray-500" />
              </div>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold truncate group-hover:text-purple-400 transition-colors duration-300">
              {artist.name}
            </h3>
            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
              {artist.followers.total.toLocaleString()} followers
            </p>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ArtistList;