import React from 'react';
import { Music } from 'lucide-react';

interface SpotifyAuthProps {
  onLogin: () => void;
}

const SpotifyAuth: React.FC<SpotifyAuthProps> = ({ onLogin }) => {
  return (
    <button
      onClick={onLogin}
      className="group relative flex items-center px-12 py-6 bg-[#1DB954] text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-[#1ed760] hover:shadow-lg hover:shadow-[#1DB954]/25 active:scale-95 transform-gpu"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
      <Music className="mr-4 transition-transform group-hover:scale-110 duration-300" size={32} />
      <span className="font-semibold text-2xl">Sign in with Spotify</span>
    </button>
  );
}

export default SpotifyAuth;