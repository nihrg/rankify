import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Music2, Disc3, Edit2, Github } from 'lucide-react';
import { toPng } from 'html-to-image';

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
}

const Rankings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tracks = location.state?.tracks || [];
  const contentRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState('My Rankings');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleExport = async () => {
    if (contentRef.current) {
      try {
        const dataUrl = await toPng(contentRef.current, {
          quality: 1.0,
          backgroundColor: '#000',
        });
        const link = document.createElement('a');
        link.download = 'my-rankings.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Error exporting image:', err);
      }
    }
  };

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const gradients = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-purple-500',
    'from-green-500 to-blue-500',
    'from-yellow-500 to-red-500',
    'from-pink-500 to-orange-500',
  ];

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2070')] bg-cover bg-center bg-fixed bg-black bg-opacity-50">
      <div className="min-h-screen backdrop-blur-xl bg-black/70">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Search
            </button>
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Download size={20} className="mr-2" />
              Export Image
            </button>
          </div>

          <div ref={contentRef} className="bg-gray-900/90 rounded-3xl p-8 backdrop-blur-sm">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Disc3 size={40} className="text-purple-500 mr-3" />
                <div className="relative group">
                  {isEditing ? (
                    <form onSubmit={handleTitleSubmit}>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => setIsEditing(false)}
                        autoFocus
                        className="text-5xl font-bold bg-transparent text-center text-white border-b-2 border-purple-500 focus:outline-none"
                      />
                    </form>
                  ) : (
                    <>
                      <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                        {title}
                      </h1>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit2 size={20} className="text-purple-400" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p className="text-gray-400 text-lg">
                {tracks.length} tracks ranked with Rankify
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {tracks.map((track: Track, index: number) => (
                <div
                  key={`${track.id}-${index}`}
                  className={`flex items-center p-6 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-2xl transform transition-transform hover:scale-[1.02]`}
                >
                  <span className="text-4xl font-bold text-white/90 mr-6 font-mono">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <Music2 className="text-white/80 mr-4" size={24} />
                  <div>
                    <h4 className="text-white font-bold text-xl">{track.name}</h4>
                    <p className="text-white/80 text-lg">
                      {track.artists.map(a => a.name).join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 text-gray-400">
              Made with{' '}
              <span className="text-purple-400 font-semibold">Rankify</span>
            </div>
          </div>
        </div>
        <footer className="py-4 mt-auto border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <span className="text-white/40 text-sm">
                Rankify © 2025
              </span>
              <a
                href="https://github.com/nihrg/rankify"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white/40 hover:text-white/60 transition-colors group"
              >
                <Github size={14} className="mr-1.5" />
                <span className="text-sm">Source Code</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Rankings;