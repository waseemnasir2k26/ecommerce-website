import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  CreditCard,
  Truck,
  ClipboardList,
  Lock,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { formatPrice } from '../utils/formatPrice';
import { setPageSEO } from '../utils/seo';
import { useCart } from '../hooks/useCart';

const STEPS = [
  { number: 1, label: 'Shipping', icon: Truck },
  { number: 2, label: 'Payment', icon: CreditCard },
  { number: 3, label: 'Review', icon: ClipboardList },
];

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'India',
  'Brazil',
  'Mexico',
];

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States',
  paymentMethod: 'credit-card',
  cardNumber: '',
  cardExpiry: '',
  cardCVV: '',
  cardName: '',
};

const FREE_SHIPPING_THRESHOLD = 75;
const SHIPPING_COST = 9.99;
const TAX_RATE = 0.08;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, cartTotal, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber] = useState(
    () => `ORD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`
  );

  useEffect(() => {
    setPageSEO({
      title: 'Checkout',
      description: 'Secure checkout. Complete your purchase with confidence.',
      canonical: 'https://luxestore.com/checkout',
    });
  }, []);

  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = cartTotal * TAX_RATE;
  const total = cartTotal + shipping + tax;

  // ── Helpers ─────────────────────────────────────────────────────
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateShipping = () => {
    const required = ['firstName', 'lastName', 'email', 'address1', 'city', 'state', 'zip', 'country'];
    const newErrors = {};
    required.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    if (formData.paymentMethod !== 'credit-card') return true;
    const required = ['cardNumber', 'cardExpiry', 'cardCVV', 'cardName'];
    const newErrors = {};
    required.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (currentStep === 1 && validateShipping()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2 && validatePayment()) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Input component ────────────────────────────────────────────
  const FormInput = ({ label, field, type = 'text', placeholder, className: cls }) => (
    <div className={cls}>
      <label className="block text-sm font-body font-medium text-text-secondary mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full px-4 py-3 rounded-lg border bg-white text-sm font-body focus:outline-none focus:border-accent transition-colors',
          errors[field] ? 'border-error' : 'border-border'
        )}
      />
      {errors[field] && (
        <p className="text-xs text-error mt-1 font-body">{errors[field]}</p>
      )}
    </div>
  );

  // ── Order-placed success state ─────────────────────────────────
  if (orderPlaced) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-5 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle2 className="w-10 h-10 text-success" />
          </motion.div>
          <h1 className="font-display text-3xl">Order Confirmed!</h1>
          <p className="text-text-secondary font-body">
            Thank you for your purchase. Your order number is{' '}
            <span className="font-mono font-semibold text-primary">{orderNumber}</span>.
          </p>
          <p className="text-text-muted text-sm font-body">
            We'll send a confirmation email with tracking details shortly.
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

  // ── Step indicator ─────────────────────────────────────────────
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-semibold transition-colors',
                  isCompleted && 'bg-success text-white',
                  isActive && 'bg-accent text-white',
                  !isCompleted && !isActive && 'bg-bg-secondary text-text-muted'
                )}
              >
                {isCompleted ? <Check size={18} /> : step.number}
              </div>
              <span
                className={cn(
                  'text-xs font-body mt-2',
                  isActive ? 'text-primary font-medium' : 'text-text-muted'
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  'w-16 sm:w-24 h-0.5 mx-2 -mt-5 transition-colors',
                  currentStep > step.number ? 'bg-accent' : 'bg-border'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  // ── Compact order sidebar ──────────────────────────────────────
  const OrderSidebar = () => (
    <div className="bg-bg-secondary rounded-2xl p-6 sticky top-24">
      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

      {/* Items list */}
      <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex-shrink-0 flex items-center justify-center font-display text-xs text-text-muted font-bold">
              {item.product.name
                ?.split(' ')
                .map((w) => w[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-primary truncate">
                {item.product.name}
              </p>
              <p className="text-xs text-text-muted font-body">
                Qty: {item.quantity}
              </p>
            </div>
            <span className="font-mono text-sm">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary font-body">Subtotal</span>
          <span className="font-mono">{formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary font-body">Shipping</span>
          <span className="font-mono">
            {shipping === 0 ? (
              <span className="text-success">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary font-body">Tax (8%)</span>
          <span className="font-mono">{formatPrice(tax)}</span>
        </div>
        <div className="border-t border-border pt-3 mt-3 flex justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-mono font-bold text-lg">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );

  // ── Redirect if cart empty ─────────────────────────────────────
  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl">Your cart is empty</h1>
          <p className="text-text-secondary font-body">
            Add items to your cart before checking out.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-body font-medium hover:opacity-90 transition-opacity"
          >
            Browse Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <StepIndicator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ── Left: Form Steps ───────────────────────────────── */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* ── Step 1: Shipping ─────────────────────────────── */}
              {currentStep === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-2xl">Shipping Information</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput label="First Name" field="firstName" placeholder="John" />
                    <FormInput label="Last Name" field="lastName" placeholder="Doe" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput label="Email" field="email" type="email" placeholder="john@example.com" />
                    <FormInput label="Phone" field="phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>

                  <FormInput label="Address Line 1" field="address1" placeholder="123 Main Street" />
                  <FormInput label="Address Line 2" field="address2" placeholder="Apt 4B (optional)" />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormInput label="City" field="city" placeholder="New York" />
                    <FormInput label="State / Province" field="state" placeholder="NY" />
                    <FormInput label="ZIP / Postal Code" field="zip" placeholder="10001" />
                  </div>

                  {/* Country dropdown */}
                  <div>
                    <label className="block text-sm font-body font-medium text-text-secondary mb-1.5">
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => updateField('country', e.target.value)}
                      className={cn(
                        'w-full px-4 py-3 rounded-lg border bg-white text-sm font-body focus:outline-none focus:border-accent transition-colors appearance-none',
                        errors.country ? 'border-error' : 'border-border'
                      )}
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleContinue}
                    className="w-full bg-primary text-white py-4 rounded-lg font-body font-medium hover:opacity-90 transition-opacity mt-4"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {/* ── Step 2: Payment ──────────────────────────────── */}
              {currentStep === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-2xl">Payment Method</h2>

                  {/* Payment method tabs */}
                  <div className="flex gap-3">
                    {[
                      { id: 'credit-card', label: 'Credit Card', icon: CreditCard },
                      { id: 'paypal', label: 'PayPal' },
                      { id: 'apple-pay', label: 'Apple Pay' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => updateField('paymentMethod', method.id)}
                        className={cn(
                          'flex-1 py-3 px-4 rounded-lg border text-sm font-body font-medium transition-colors',
                          formData.paymentMethod === method.id
                            ? 'border-accent bg-accent/5 text-accent'
                            : 'border-border text-text-secondary hover:border-text-muted'
                        )}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>

                  {/* Credit card form */}
                  {formData.paymentMethod === 'credit-card' && (
                    <div className="space-y-4 border border-border rounded-xl p-5">
                      <div>
                        <label className="block text-sm font-body font-medium text-text-secondary mb-1.5">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => updateField('cardNumber', e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className={cn(
                              'w-full px-4 py-3 rounded-lg border bg-white text-sm font-mono focus:outline-none focus:border-accent transition-colors',
                              errors.cardNumber ? 'border-error' : 'border-border'
                            )}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted font-mono">
                            Visa / MC
                          </span>
                        </div>
                        {errors.cardNumber && (
                          <p className="text-xs text-error mt-1 font-body">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormInput label="Expiry (MM/YY)" field="cardExpiry" placeholder="12/28" />
                        <FormInput label="CVV" field="cardCVV" placeholder="123" />
                      </div>

                      <FormInput label="Name on Card" field="cardName" placeholder="John Doe" />
                    </div>
                  )}

                  {/* PayPal / Apple Pay placeholder */}
                  {formData.paymentMethod === 'paypal' && (
                    <div className="border border-border rounded-xl p-8 text-center">
                      <p className="text-text-secondary font-body">
                        You will be redirected to PayPal to complete your payment.
                      </p>
                    </div>
                  )}

                  {formData.paymentMethod === 'apple-pay' && (
                    <div className="border border-border rounded-xl p-8 text-center">
                      <p className="text-text-secondary font-body">
                        Confirm your payment using Apple Pay on your device.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors font-body"
                    >
                      <ChevronLeft size={16} />
                      Back
                    </button>
                    <button
                      onClick={handleContinue}
                      className="flex-1 bg-primary text-white py-4 rounded-lg font-body font-medium hover:opacity-90 transition-opacity"
                    >
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Review ───────────────────────────────── */}
              {currentStep === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-2xl">Review Your Order</h2>

                  {/* Shipping address summary */}
                  <div className="border border-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-body font-semibold text-sm uppercase tracking-wider text-text-muted">
                        Shipping Address
                      </h3>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-xs text-accent hover:underline font-body"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm font-body text-primary">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-sm font-body text-text-secondary">
                      {formData.address1}
                      {formData.address2 && `, ${formData.address2}`}
                    </p>
                    <p className="text-sm font-body text-text-secondary">
                      {formData.city}, {formData.state} {formData.zip}
                    </p>
                    <p className="text-sm font-body text-text-secondary">
                      {formData.country}
                    </p>
                    <p className="text-sm font-body text-text-secondary mt-1">
                      {formData.email} | {formData.phone}
                    </p>
                  </div>

                  {/* Payment summary */}
                  <div className="border border-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-body font-semibold text-sm uppercase tracking-wider text-text-muted">
                        Payment Method
                      </h3>
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-xs text-accent hover:underline font-body"
                      >
                        Edit
                      </button>
                    </div>
                    {formData.paymentMethod === 'credit-card' ? (
                      <div className="flex items-center gap-2">
                        <CreditCard size={18} className="text-text-muted" />
                        <span className="text-sm font-body">
                          Credit card ending in{' '}
                          <span className="font-mono font-medium">
                            {formData.cardNumber.slice(-4) || '****'}
                          </span>
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm font-body capitalize">
                        {formData.paymentMethod.replace('-', ' ')}
                      </p>
                    )}
                  </div>

                  {/* Order items */}
                  <div className="border border-border rounded-xl p-5">
                    <h3 className="font-body font-semibold text-sm uppercase tracking-wider text-text-muted mb-4">
                      Order Items
                    </h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-body font-medium text-primary">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-text-muted font-body">
                              Qty: {item.quantity} x {formatPrice(item.product.price)}
                            </p>
                          </div>
                          <span className="font-mono text-sm font-medium">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total breakdown */}
                  <div className="border border-border rounded-xl p-5 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary font-body">Subtotal</span>
                      <span className="font-mono">{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary font-body">Shipping</span>
                      <span className="font-mono">
                        {shipping === 0 ? (
                          <span className="text-success">Free</span>
                        ) : (
                          formatPrice(shipping)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary font-body">Tax (8%)</span>
                      <span className="font-mono">{formatPrice(tax)}</span>
                    </div>
                    <div className="border-t border-border pt-3 mt-3 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-mono font-bold text-lg">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Place order */}
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-accent text-white py-4 rounded-lg font-body font-semibold text-lg hover:opacity-90 transition-opacity"
                  >
                    Place Order
                  </button>

                  <div className="flex items-center justify-center gap-1.5">
                    <Lock size={12} className="text-text-muted" />
                    <span className="text-xs text-text-muted font-body">
                      Your payment information is encrypted and secure
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: Order Summary Sidebar ──────────────────── */}
          <div className="lg:col-span-1 hidden lg:block">
            <OrderSidebar />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
