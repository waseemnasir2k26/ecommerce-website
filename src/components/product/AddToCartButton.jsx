import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useCart } from '../../hooks/useCart';

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const iconSizeMap = {
  sm: 14,
  md: 16,
  lg: 18,
};

export default function AddToCartButton({
  product,
  variant = 'default',
  size = 'md',
  className,
}) {
  const { addToCart, isInCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const inCart = isInCart(product.id);
  const iconSize = iconSizeMap[size];

  const handleClick = () => {
    if (inCart) return;

    setIsLoading(true);

    // Brief loading state for tactile feedback
    setTimeout(() => {
      addToCart(product);
      setIsLoading(false);
      setShowSuccess(true);
    }, 300);
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  // ── Icon Variant ──────────────────────────────────────────────────
  if (variant === 'icon') {
    return (
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer',
          size === 'sm' && 'w-8 h-8',
          size === 'md' && 'w-10 h-10',
          size === 'lg' && 'w-12 h-12',
          inCart || showSuccess
            ? 'bg-green-600 text-white'
            : 'bg-primary text-white hover:bg-primary-light',
          isLoading && 'opacity-50 cursor-not-allowed',
          className
        )}
        aria-label={inCart ? 'Added to cart' : 'Add to cart'}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
            >
              <ShoppingBag size={iconSize} />
            </motion.div>
          ) : inCart || showSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Check size={iconSize} />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <ShoppingBag size={iconSize} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  // ── Default Variant ───────────────────────────────────────────────
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-body font-medium rounded-lg transition-all duration-200 cursor-pointer',
        sizeClasses[size],
        inCart || showSuccess
          ? 'bg-green-600 text-white'
          : 'bg-primary text-white hover:bg-primary-light',
        isLoading && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.span
            key="loading"
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <ShoppingBag size={iconSize} />
            </motion.span>
            Adding...
          </motion.span>
        ) : inCart || showSuccess ? (
          <motion.span
            key="success"
            className="flex items-center gap-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Check size={iconSize} />
            Added
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ShoppingBag size={iconSize} />
            Add to Cart
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
