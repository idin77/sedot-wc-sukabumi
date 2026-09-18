import React, { useState } from 'react';

interface ImageWrapperProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
        }`}
      />
    </div>
  );
};
