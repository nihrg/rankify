import React from 'react';
import { Music } from 'lucide-react';

interface SpotifyAuthProps {
  onLogin: () => void;
}

const SpotifyAuth: React.FC<SpotifyAuthProps> = ({ onLogin }) => {
  return (
    <button
      onClick={onLogin}
      className="flex items-center justify-center w-full max-w-md mx-auto px-8 py-3 bg-[#1DB954] text-white rounded-full hover:bg-[#1ed760] transition-colors font-semibold"
    >
      <Music className="mr-2" size={20} />
      Sign in with Spotify
    </button>
  );
}

export default SpotifyAuth;