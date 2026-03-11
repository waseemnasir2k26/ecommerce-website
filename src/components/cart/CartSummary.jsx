import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tag, Truck, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../hooks/useCart';

const FREE_SHIPPING_THRESHOLD = 75;
const TAX_RATE = 0.08;
const SHIPPING_COST = 9.99;

export default function CartSummary() {
  const { cartTotal } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [discountApplied, setDiscountApplied] = useState(null);

  const subtotal = cartTotal;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discountAmount = discountApplied ? discountApplied.amount : 0;
  const taxableAmount = subtotal - discountAmount + shipping;
  const tax = taxableAmount * TAX_RATE;
  const total = taxableAmount + tax;

  const handleApplyDiscount = () => {
    setDiscountError('');
    setDiscountApplied(null);

    if (!discountCode.trim()) {
      setDiscountError('Please enter a discount code.');
      return;
    }

    // Mock discount codes
    const codes = {
      SAVE10: { type: 'percent', value: 10, amount: subtotal * 0.1 },
      WELCOME: { type: 'fixed', value: 5, amount: 5 },
    };

    const upperCode = discountCode.trim().toUpperCase();
    if (codes[upperCode]) {
      setDiscountApplied({
        code: upperCode,
        ...codes[upperCode],
      });
    } else {
      setDiscountError('Invalid discount code. Try SAVE10 or WELCOME.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white rounded-2xl border border-border p-6 space-y-5"
    >
      <h2 className="font-display text-lg font-bold text-primary">
        Order Summary
      </h2>

      {/* Line items */}
      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-text-secondary">Subtotal</span>
          <span className="font-mono text-sm text-primary">
            {formatPrice(subtotal)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-text-secondary flex items-center gap-1.5">
            <Truck size={14} />
            Shipping
          </span>
          <span className="font-mono text-sm text-primary">
            {shipping === 0 ? (
              <span className="text-green-600 font-medium">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-text-secondary">
            Tax (est. 8%)
          </span>
          <span className="font-mono text-sm text-primary">
            {formatPrice(tax)}
          </span>
        </div>

        {/* Discount applied */}
        {discountApplied && (
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-green-600 flex items-center gap-1.5">
              <Tag size={14} />
              Discount ({discountApplied.code})
            </span>
            <span className="font-mono text-sm text-green-600 font-medium">
              &minus;{formatPrice(discountAmount)}
            </span>
          </div>
        )}
      </div>

      {/* Discount code input */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => {
              setDiscountCode(e.target.value);
              setDiscountError('');
            }}
            placeholder="Discount code"
            className={cn(
              'flex-1 font-body text-sm rounded-lg px-4 py-2.5 border bg-white text-primary',
              'placeholder:text-text-muted outline-none transition-all duration-200',
              discountError
                ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
                : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/20'
            )}
          />
          <button
            onClick={handleApplyDiscount}
            className={cn(
              'px-4 py-2.5 rounded-lg font-body text-sm font-medium transition-all duration-200',
              'border-2 border-primary text-primary hover:bg-primary hover:text-white'
            )}
          >
            Apply
          </button>
        </div>
        {discountError && (
          <p className="font-body text-xs text-error">{discountError}</p>
        )}
        {discountApplied && (
          <p className="font-body text-xs text-green-600">
            Discount applied! You saved {formatPrice(discountAmount)}.
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="font-display text-base font-bold text-primary">
          Total
        </span>
        <span className="font-mono text-xl font-bold text-primary">
          {formatPrice(total)}
        </span>
      </div>

      {/* Checkout button */}
      <Link
        to="/checkout"
        className={cn(
          'w-full inline-flex items-center justify-center px-6 py-3.5 rounded-lg',
          'font-body font-medium text-sm transition-all duration-200',
          'bg-primary text-white hover:bg-primary-light'
        )}
      >
        Proceed to Checkout
      </Link>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <ShieldCheck size={14} className="text-text-muted" />
        <span className="font-body text-xs text-text-muted">
          Secure checkout &middot; SSL encrypted
        </span>
      </div>
    </motion.div>
  );
}
