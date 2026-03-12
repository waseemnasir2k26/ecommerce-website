import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Eye } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatPrice } from '../../utils/formatPrice';
import Badge from '../ui/Badge';
import AddToCartButton from './AddToCartButton';

const badgeVariantMap = {
  New: 'new',
  Sale: 'sale',
  Bestseller: 'bestseller',
};

function StarRating({ rating, reviewCount }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={14}
            className={cn(
              i < Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            )}
          />
        ))}
      </div>
      <span className="text-xs text-text-muted font-mono">({reviewCount})</span>
    </div>
  );
}

export default function ProductCard({ product, onQuickView }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const {
    id,
    name,
    slug,
    price,
    originalPrice,
    images,
    rating,
    reviewCount,
    badge,
    category,
  } = product;

  const hasImage = images && images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
    >
      {/* Image Container */}
      <div className="aspect-square overflow-hidden rounded-t-xl bg-bg-secondary relative">
        {hasImage && (
          <>
            <img
              src={images[0]}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-100 group-hover:opacity-0"
              loading="lazy"
            />
            {images[1] && (
              <img
                src={images[1]}
                alt={`${name} alternate view`}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                loading="lazy"
              />
            )}
          </>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={badgeVariantMap[badge] || 'default'}>{badge}</Badge>
          </div>
        )}

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          {onQuickView && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05 }}
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-primary hover:text-accent transition-colors cursor-pointer"
              aria-label="Quick view"
            >
              <Eye size={18} />
            </motion.button>
          )}
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted((prev) => !prev);
            }}
            className={cn(
              'w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-colors cursor-pointer',
              isWishlisted
                ? 'text-red-500'
                : 'text-primary hover:text-accent'
            )}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
          </motion.button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-text-muted uppercase tracking-wider font-mono mb-1">
          {category}
        </p>

        {/* Name */}
        <Link
          to={`/product/${slug}`}
          className="text-sm font-medium text-primary hover:text-accent transition-colors duration-200 line-clamp-2 block mb-2"
        >
          {name}
        </Link>

        {/* Rating */}
        <div className="mb-2">
          <StarRating rating={rating} reviewCount={reviewCount} />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono font-semibold text-primary">
            {formatPrice(price)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="font-mono text-sm text-text-muted line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <AddToCartButton product={product} variant="default" size="md" className="w-full" />
      </div>
    </motion.div>
  );
}
