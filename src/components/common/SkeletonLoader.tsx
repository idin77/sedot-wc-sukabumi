import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = "w-full h-20" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md ${className}`} />
  );
};
