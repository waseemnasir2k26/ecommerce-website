import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

function GalleryPlaceholder({ name, large }) {
  const initials = (name || 'P')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="w-full h-full flex items-center justify-center bg-bg-secondary">
      <span
        className={cn(
          'font-display text-text-muted/40 select-none',
          large ? 'text-6xl md:text-8xl' : 'text-lg'
        )}
      >
        {initials}
      </span>
    </div>
  );
}

export default function ProductGallery({ images = [], name = 'Product' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const mainImageRef = useRef(null);

  const hasRealImages =
    images.length > 0 && !images.every((img) => img.includes('placeholder'));

  // Generate placeholder "images" if none exist
  const displayImages = hasRealImages
    ? images
    : [null]; // single placeholder

  const currentImage = displayImages[selectedIndex] || null;

  const handleMouseMove = (e) => {
    if (!mainImageRef.current || !currentImage) return;

    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (currentImage) setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div
        ref={mainImageRef}
        className="relative aspect-square overflow-hidden rounded-xl bg-bg-secondary cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {currentImage ? (
              <img
                src={currentImage}
                alt={`${name} - Image ${selectedIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{
                  transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            ) : (
              <GalleryPlaceholder name={name} large />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Image Counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-mono px-2.5 py-1 rounded-full">
            {selectedIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer',
                index === selectedIndex
                  ? 'border-accent shadow-sm'
                  : 'border-transparent hover:border-border opacity-70 hover:opacity-100'
              )}
            >
              {image ? (
                <img
                  src={image}
                  alt={`${name} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <GalleryPlaceholder name={name} large={false} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
