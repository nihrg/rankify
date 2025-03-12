import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleCallback } from '../utils/spotify';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = handleCallback();
    // Navigate to search page after successful authentication
    navigate('/search', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-400">Connecting to Spotify...</p>
      </div>
    </div>
  );
};

export default Callback;