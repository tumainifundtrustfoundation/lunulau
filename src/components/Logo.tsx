import React, { useState } from 'react';
import logoImg from '../assets/images/lupanulla_logo_1783623714916.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTextFallback?: boolean;
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const [imgSrc, setImgSrc] = useState<string>(logoImg);

  const imgSizeClasses = {
    sm: 'h-10 w-10 sm:h-11 sm:w-11 rounded-xl',
    md: 'h-12 w-12 sm:h-14 sm:w-14 rounded-xl',
    lg: 'h-16 w-16 sm:h-20 sm:w-20 rounded-2xl',
    xl: 'h-24 w-24 sm:h-32 sm:w-32 rounded-3xl'
  };

  const handleError = () => {
    if (imgSrc !== '/logo.jpg') {
      setImgSrc('/logo.jpg');
    }
  };

  return (
    <img
      src={imgSrc}
      alt="Lupanulla Elimu Hub Official Logo"
      referrerPolicy="no-referrer"
      onError={handleError}
      className={`${imgSizeClasses[size]} object-contain bg-white shadow-md border border-slate-200/80 shrink-0 ${className}`}
    />
  );
}



