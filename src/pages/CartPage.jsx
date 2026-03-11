import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Minus, Plus, Trash2, Lock, Tag } from 'lucide-react';
import { cn } from '../utils/cn';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

const FREE_SHIPPING_THRESHOLD = 75;
const SHIPPING_COST = 9.99;
const TAX_RATE = 0.08;

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    document.title = 'Cart — LUXE';
  }, []);

  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = cartTotal * TAX_RATE;
  const total = cartTotal + shipping + tax;

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      setDiscountApplied(true);
    }
  };

  // ── Empty cart state ──────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <ShoppingBag className="w-16 h-16 text-text-muted mx-auto" />
          <h1 className="font-display text-2xl">Your cart is empty</h1>
          <p className="text-text-secondary">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-body font-medium hover:opacity-90 transition-opacity mt-2"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </main>
    );
  }

  // ── Cart with items ───────────────────────────────────────────────
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Title */}
        <div className="mb-8">
          <h1 className="font-display text-3xl">
            Shopping Cart{' '}
            <span className="text-text-muted text-lg font-body">
              ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ── Left: Cart Items ──────────────────────────────────── */}
          <div className="lg:col-span-2">
            {/* Table header (hidden on mobile) */}
            <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_auto] md:gap-4 pb-4 border-b border-border">
              <span className="text-sm text-text-muted uppercase font-mono tracking-wider">
                Product
              </span>
              <span className="text-sm text-text-muted uppercase font-mono tracking-wider text-center">
                Quantity
              </span>
              <span className="text-sm text-text-muted uppercase font-mono tracking-wider text-right">
                Total
              </span>
              <span className="w-10" />
            </div>

            {/* Item rows */}
            <AnimatePresence mode="popLayout">
              {items.map((item) => {
                const { product, quantity } = item;
                const lineTotal = product.price * quantity;

                const initials = product.name
                  ?.split(' ')
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -80 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-wrap md:grid md:grid-cols-[2fr_1fr_1fr_auto] md:gap-4 items-center border-b border-border py-6"
                  >
                    {/* Product info */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      {/* Image placeholder */}
                      {product.image || product.images?.[0] ? (
                        <img
                          src={product.image || product.images[0]}
                          alt={product.name}
                          className="w-24 h-24 bg-bg-secondary rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-bg-secondary rounded-lg flex-shrink-0 flex items-center justify-center font-display font-bold text-text-muted text-lg">
                          {initials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <Link
                          to={`/product/${product.slug || product.id}`}
                          className="font-medium text-primary hover:text-accent transition-colors line-clamp-2"
                        >
                          {product.name}
                        </Link>
                        {product.category && (
                          <p className="text-sm text-text-muted capitalize mt-1">
                            {product.category}
                          </p>
                        )}
                        <p className="font-mono text-sm text-text-secondary mt-1">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-center mt-4 md:mt-0">
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, Math.max(1, quantity - 1))
                          }
                          disabled={quantity <= 1}
                          className={cn(
                            'w-9 h-9 flex items-center justify-center transition-colors',
                            quantity <= 1
                              ? 'text-text-muted/40 cursor-not-allowed'
                              : 'text-text-secondary hover:bg-bg-secondary hover:text-primary'
                          )}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 h-9 flex items-center justify-center font-mono text-sm font-medium text-primary bg-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-text-secondary hover:bg-bg-secondary hover:text-primary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="text-right mt-4 md:mt-0">
                      <span className="font-mono font-semibold">
                        {formatPrice(lineTotal)}
                      </span>
                    </div>

                    {/* Remove */}
                    <div className="flex justify-end mt-4 md:mt-0">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-text-muted hover:text-error transition-colors p-2 rounded-lg hover:bg-error/5"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Clear cart */}
            <div className="mt-6 flex justify-between items-center">
              <Link
                to="/shop"
                className="text-sm text-text-secondary hover:text-primary transition-colors font-body"
              >
                &larr; Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-text-muted hover:text-error transition-colors font-body"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* ── Right: Order Summary ─────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-bg-secondary rounded-2xl p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-6">Order Summary</h2>

              {/* Subtotal */}
              <div className="flex justify-between items-center py-2">
                <span className="text-text-secondary font-body">Subtotal</span>
                <span className="font-mono">{formatPrice(cartTotal)}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center py-2">
                <span className="text-text-secondary font-body">Shipping</span>
                <span className="font-mono">
                  {shipping === 0 ? (
                    <span className="text-success">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              {/* Tax */}
              <div className="flex justify-between items-center py-2">
                <span className="text-text-secondary font-body">
                  Estimated Tax (8%)
                </span>
                <span className="font-mono">{formatPrice(tax)}</span>
              </div>

              {/* Discount code */}
              <div className="flex gap-2 mt-4">
                <div className="flex-1 relative">
                  <Tag
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Discount code"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-white text-sm font-body focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <button
                  onClick={handleApplyDiscount}
                  className="px-4 py-2.5 rounded-lg border border-border text-sm font-body font-medium hover:bg-white transition-colors"
                >
                  Apply
                </button>
              </div>
              {discountApplied && (
                <p className="text-xs text-success mt-2 font-body">
                  Discount code applied!
                </p>
              )}

              {/* Divider */}
              <div className="border-t border-border my-5" />

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-mono text-xl font-bold">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Checkout button */}
              <Link
                to="/checkout"
                className="block w-full text-center bg-primary text-white py-4 rounded-lg font-body font-medium mt-6 hover:opacity-90 transition-opacity"
              >
                Proceed to Checkout
              </Link>

              {/* Security note */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <Lock size={12} className="text-text-muted" />
                <span className="text-xs text-text-muted font-body">
                  Secure checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
