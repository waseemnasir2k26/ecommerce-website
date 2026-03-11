import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';

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
  const { items, cartCount, cartTotal } = useCart();

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

                  {/* Free shipping note */}
                  {!qualifiesForFreeShipping && (
                    <p className="font-body text-xs text-text-muted text-center">
                      Free shipping on orders over{' '}
                      <span className="font-mono font-medium">
                        {formatPrice(FREE_SHIPPING_THRESHOLD)}
                      </span>
                      {' '}&mdash; you're{' '}
                      <span className="font-mono font-medium text-accent">
                        {formatPrice(FREE_SHIPPING_THRESHOLD - cartTotal)}
                      </span>{' '}
                      away!
                    </p>
                  )}
                  {qualifiesForFreeShipping && (
                    <p className="font-body text-xs text-green-600 text-center font-medium">
                      You qualify for free shipping!
                    </p>
                  )}

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
