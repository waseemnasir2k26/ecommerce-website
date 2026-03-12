import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import { products } from '../../data/products';

const FREE_SHIPPING_THRESHOLD = 75;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 },
  },
  exit: {
    x: '100%',
    transition: { type: 'spring', damping: 30, stiffness: 300 },
  },
};

export default function CartDrawer({ isOpen, onClose }) {
  const { items, cartCount, cartTotal, addToCart } = useCart();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const qualifiesForFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  // Cross-sell: pick 3 products not already in cart
  const suggestions = useMemo(() => {
    const cartIds = new Set(items.map((item) => item.product.id));
    const available = products.filter((p) => !cartIds.has(p.id));
    // Fisher-Yates shuffle (on a copy)
    const shuffled = [...available];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 3);
  }, [items]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-xl font-bold text-primary">
                  Shopping Cart
                </h2>
                {cartCount > 0 && (
                  <span className="bg-accent text-white text-xs font-mono rounded-full w-6 h-6 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-primary transition-colors p-1 rounded-lg hover:bg-bg-secondary"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Body */}
            {items.length === 0 ? (
              /* Empty state */
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-24 h-24 rounded-full bg-bg-secondary flex items-center justify-center mb-6">
                  <ShoppingBag size={40} className="text-text-muted" />
                </div>
                <h3 className="font-display text-lg font-semibold text-primary mb-2">
                  Your cart is empty
                </h3>
                <p className="font-body text-sm text-text-secondary mb-8">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className={cn(
                    'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body font-medium text-sm',
                    'bg-primary text-white hover:bg-primary-light transition-all duration-200'
                  )}
                >
                  Continue Shopping
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                {/* Scrollable item list */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}

                  {/* Cross-sell suggestions */}
                  {suggestions.length > 0 && (
                    <div className="pt-4 mt-4 border-t border-border">
                      <h4 className="font-display text-sm font-semibold text-primary mb-3">
                        You might also like
                      </h4>
                      <div className="space-y-3">
                        {suggestions.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-3"
                          >
                            {product.images?.[0] ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover shrink-0"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-bg-secondary shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-body text-xs font-medium text-primary truncate">
                                {product.name}
                              </p>
                              <p className="font-mono text-xs text-accent">
                                {formatPrice(product.price)}
                              </p>
                            </div>
                            <button
                              onClick={() => addToCart(product, 1)}
                              className={cn(
                                'shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
                                'border border-border text-text-secondary',
                                'hover:bg-accent hover:text-white hover:border-accent',
                                'transition-all duration-200'
                              )}
                              aria-label={`Add ${product.name} to cart`}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-border px-6 py-5 space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-text-secondary">
                      Subtotal
                    </span>
                    <span className="font-mono text-lg font-semibold text-primary">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>

                  {/* Free shipping progress bar */}
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${shippingProgress}%` }}
                      />
                    </div>
                    {qualifiesForFreeShipping ? (
                      <p className="font-body text-xs text-green-600 text-center font-medium">
                        {'\uD83C\uDF89'} You qualify for free shipping!
                      </p>
                    ) : (
                      <p className="font-body text-xs text-text-muted text-center">
                        You're{' '}
                        <span className="font-mono font-medium text-accent">
                          {formatPrice(FREE_SHIPPING_THRESHOLD - cartTotal)}
                        </span>{' '}
                        away from FREE shipping!
                      </p>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/cart"
                      onClick={onClose}
                      className={cn(
                        'w-full inline-flex items-center justify-center px-6 py-3 rounded-lg',
                        'font-body font-medium text-sm transition-all duration-200',
                        'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                      )}
                    >
                      View Cart
                    </Link>
                    <Link
                      to="/checkout"
                      onClick={onClose}
                      className={cn(
                        'w-full inline-flex items-center justify-center px-6 py-3 rounded-lg',
                        'font-body font-medium text-sm transition-all duration-200',
                        'bg-primary text-white hover:bg-primary-light'
                      )}
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
