import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import logoImg from '../assets/images/lupanulla_logo_1783623714916.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTextFallback?: boolean;
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const [imgSrc, setImgSrc] = useState<string>(logoImg);
  const [imgError, setImgError] = useState<boolean>(false);

  const imgSizeClasses = {
    sm: 'h-10 w-10 sm:h-11 sm:w-11 rounded-xl',
    md: 'h-12 w-12 sm:h-14 sm:w-14 rounded-xl',
    lg: 'h-16 w-16 sm:h-20 sm:w-20 rounded-2xl',
    xl: 'h-24 w-24 sm:h-32 sm:w-32 rounded-3xl'
  };

  const svgSizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-12 h-12 sm:w-14 sm:h-14 rounded-xl',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl',
    xl: 'w-24 h-24 sm:w-32 sm:h-32 rounded-3xl'
  };

  const svgPadding = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3.5',
    xl: 'p-5'
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 32,
    xl: 48
  };

  const handleError = () => {
    if (imgSrc !== '/logo.jpg') {
      setImgSrc('/logo.jpg?v=2');
    } else {
      setImgError(true);
    }
  };

  if (!imgError) {
    return (
      <img
        src={imgSrc}
        alt="Lupanulla Elimu Hub Official Logo"
        referrerPolicy="no-referrer"
        onError={handleError}
        className={`${imgSizeClasses[size]} object-contain p-0.5 bg-white shadow-md border border-slate-200/80 shrink-0 ${className}`}
      />
    );
  }

  // Fallback SVG if image fails to load
  return (
    <div 
      className={`${svgSizeClasses[size]} ${svgPadding[size]} bg-white shadow-md border border-slate-200 flex items-center justify-center relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-green-600/5" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-baseline font-black leading-none tracking-tighter">
          <span className="text-blue-900" style={{ fontSize: iconSizes[size] * 1.2 }}>L</span>
          <span className="text-green-600" style={{ fontSize: iconSizes[size] * 1.2 }}>N</span>
        </div>
        <GraduationCap 
          size={iconSizes[size] * 0.6} 
          className="text-blue-900 mt-[-2px] transition-transform duration-300 group-hover:scale-110" 
        />
      </div>
      
      <div className="absolute -bottom-1 -right-1 w-2/3 h-2/3 bg-green-500/10 rounded-full blur-md" />
    </div>
  );
}


