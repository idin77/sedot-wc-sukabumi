import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ImageWrapper } from './ImageWrapper';

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image.src)}
            className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all"
            aria-label={`View full image: ${image.alt}`}
          >
            <ImageWrapper src={image.src} alt={image.alt} className="w-full h-full" />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-gray-300" onClick={() => setSelectedImage(null)}>
            <X className="w-8 h-8" />
          </button>
          <img src={selectedImage} alt="Full screen project view" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </>
  );
};
