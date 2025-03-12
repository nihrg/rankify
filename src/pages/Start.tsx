import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Github } from 'lucide-react';
import { motion, useAnimationControls } from 'framer-motion';
import SpotifyAuth from '../components/SpotifyAuth';
import { loginWithSpotify } from '../utils/spotify';

const Start = () => {
  const navigate = useNavigate();
  const logoControls = useAnimationControls();

  useEffect(() => {
    // Start the animation only after the component is mounted
    logoControls.start({
      rotateY: 360,
      transition: {
        duration: 4,
        ease: "linear",
        repeat: Infinity
      }
    });
  }, [logoControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.95 }
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={backgroundVariants}
      className="min-h-screen bg-[url('https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2070')] bg-cover bg-center bg-fixed overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
      />
      <div className="min-h-screen backdrop-blur-xl bg-black/70 flex flex-col relative">
        {/* Animated background particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        <main className="flex-1 flex items-center justify-center">
          <motion.div
            variants={containerVariants}
            className="text-center px-4 relative"
          >
            <motion.div
              className="flex items-center justify-center mb-6 perspective-1000"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="relative"
                animate={floatingAnimation}
              >
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl"
                  animate={logoControls}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ rotateY: 0 }}
                  >
                    <Music className="w-12 h-12 text-white" />
                  </motion.div>
                </motion.div>
                <motion.div
                  className="absolute -inset-4 bg-purple-500/20 rounded-3xl blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-4"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: '200% auto',
              }}
            >
              Rankify
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Create, customize, and share your ultimate music rankings. Search for your favorite albums and artists, then rank their tracks to your heart's content.
            </motion.p>
            
            <motion.div
              variants={containerVariants}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="transform-gpu"
              >
                <SpotifyAuth onLogin={loginWithSpotify} />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative w-full max-w-sm flex items-center justify-center"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative px-4 bg-transparent">
                  <span className="text-sm text-gray-400">or</span>
                </div>
              </motion.div>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => navigate('/search')}
                className="px-8 py-4 bg-gray-800/80 text-gray-300 rounded-full text-lg font-semibold hover:bg-gray-700/80 transition-colors transform-gpu backdrop-blur-sm"
              >
                Continue without signing in
              </motion.button>
            </motion.div>
          </motion.div>
        </main>

        <motion.footer
          variants={itemVariants}
          className="py-4 border-t border-white/10 relative z-10"
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <motion.span
                variants={itemVariants}
                className="text-white/40 text-sm"
              >
                Rankify © 2025
              </motion.span>
              <motion.a
                variants={buttonVariants}
                whileHover="hover"
                href="https://github.com/nihrg/rankify"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white/40 hover:text-white/60 transition-colors group"
              >
                <Github size={14} className="mr-1.5" />
                <span className="text-sm">Source Code</span>
              </motion.a>
            </div>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default Start;