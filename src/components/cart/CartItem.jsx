import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../hooks/useCart';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  // Generate initials from product name for placeholder
  const initials = product.name
    ?.split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex gap-4 py-4 border-b border-border last:border-b-0"
    >
      {/* Product image placeholder */}
      <Link
        to={`/product/${product.slug || product.id}`}
        className="shrink-0"
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
        ) : (
          <div
            className={cn(
              'w-20 h-20 rounded-lg flex items-center justify-center',
              'bg-bg-secondary text-text-muted font-display font-bold text-lg'
            )}
          >
            {initials}
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link
            to={`/product/${product.slug || product.id}`}
            className="font-body text-sm font-medium text-primary hover:text-accent transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
          <p className="font-mono text-sm text-accent mt-1">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Bottom row: quantity controls + remove */}
        <div className="flex items-center justify-between mt-2">
          {/* Quantity controls */}
          <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden">
            <button
              onClick={() =>
                updateQuantity(product.id, Math.max(1, quantity - 1))
              }
              disabled={quantity <= 1}
              className={cn(
                'w-8 h-8 flex items-center justify-center transition-colors',
                quantity <= 1
                  ? 'text-text-muted/40 cursor-not-allowed'
                  : 'text-text-secondary hover:bg-bg-secondary hover:text-primary'
              )}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 h-8 flex items-center justify-center font-mono text-sm text-primary font-medium bg-white">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-text-secondary hover:bg-bg-secondary hover:text-primary transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Remove button */}
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-text-muted hover:text-error transition-colors p-1.5 rounded-lg hover:bg-error/5"
            aria-label={`Remove ${product.name} from cart`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
