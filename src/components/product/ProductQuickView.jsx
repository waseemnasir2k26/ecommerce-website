import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatPrice } from '../../utils/formatPrice';
import AddToCartButton from './AddToCartButton';

function ProductPlaceholder({ name }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="w-full h-full flex items-center justify-center bg-bg-secondary rounded-xl">
      <span className="font-display text-5xl text-text-muted/40 select-none">
        {initials}
      </span>
    </div>
  );
}

export default function ProductQuickView({ product, isOpen, onClose }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  if (!product) return null;

  const {
    name,
    price,
    originalPrice,
    images,
    rating,
    reviewCount,
    description,
    colors = [],
    sizes = [],
  } = product;

  const hasImage =
    images && images.length > 0 && !images[0].includes('placeholder');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-primary hover:text-accent transition-colors cursor-pointer shadow-sm"
              aria-label="Close quick view"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Image */}
              <div className="aspect-square bg-bg-secondary">
                {hasImage ? (
                  <img
                    src={images[0]}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ProductPlaceholder name={name} />
                )}
              </div>

              {/* Right: Details */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                {/* Name */}
                <h2 className="font-display text-xl md:text-2xl text-primary mb-2">
                  {name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={cn(
                          i < Math.round(rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-text-muted font-mono">
                    ({reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-2xl font-semibold text-primary">
                    {formatPrice(price)}
                  </span>
                  {originalPrice && originalPrice > price && (
                    <span className="font-mono text-lg text-text-muted line-through">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>

                {/* Description */}
                {description && (
                  <p className="font-body text-sm text-text-secondary leading-relaxed mb-5 line-clamp-3">
                    {description}
                  </p>
                )}

                {/* Color Selector */}
                {colors.length > 0 && (
                  <div className="mb-4">
                    <p className="font-body text-sm font-medium text-primary mb-2">
                      Color:{' '}
                      <span className="font-normal text-text-secondary">
                        {colors[selectedColor]}
                      </span>
                    </p>
                    <div className="flex gap-2">
                      {colors.map((color, i) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(i)}
                          className={cn(
                            'px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer',
                            i === selectedColor
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border text-text-secondary hover:border-primary'
                          )}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {sizes.length > 0 && (
                  <div className="mb-5">
                    <p className="font-body text-sm font-medium text-primary mb-2">
                      Size:{' '}
                      <span className="font-normal text-text-secondary">
                        {sizes[selectedSize]}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size, i) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(i)}
                          className={cn(
                            'min-w-[2.5rem] px-3 py-1.5 text-sm font-mono rounded-lg border transition-all cursor-pointer',
                            i === selectedSize
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border text-text-secondary hover:border-primary'
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart */}
                <AddToCartButton
                  product={product}
                  variant="default"
                  size="lg"
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
