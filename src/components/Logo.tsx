import React from 'react';
import { Music } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: {
      container: 'w-12 h-12',
      icon: 16,
    },
    md: {
      container: 'w-16 h-16',
      icon: 24,
    },
    lg: {
      container: 'w-24 h-24',
      icon: 32,
    },
    xl: {
      container: 'w-32 h-32',
      icon: 48,
    },
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${sizes[size].container} bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center`}
      >
        <Music className="text-white" size={sizes[size].icon} />
      </div>
      <div
        className="absolute -inset-4 bg-purple-500/20 rounded-3xl blur-xl -z-10"
      />
    </div>
  );
};

export default Logo;