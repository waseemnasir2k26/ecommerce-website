import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { products } from '../../data/products';

const NAMES = [
  'Sarah', 'James', 'Emily', 'Michael', 'Priya',
  'Daniel', 'Michelle', 'David', 'Luca', 'Amara',
];

const CITIES = [
  'New York', 'Los Angeles', 'Chicago', 'London', 'Toronto',
  'Sydney', 'Austin', 'Denver', 'Portland', 'Miami',
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function SocialProofToast() {
  const [notification, setNotification] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  const showNotification = useCallback(() => {
    if (dismissed) return;
    const product = pickRandom(products);
    setNotification({
      name: pickRandom(NAMES),
      city: pickRandom(CITIES),
      productName: product.name,
      productImage: product.images[0],
    });
  }, [dismissed]);

  // First notification after 8 seconds, then every 30 seconds
  useEffect(() => {
    if (dismissed) return;

    const initialTimer = setTimeout(() => {
      showNotification();
    }, 8000);

    const interval = setInterval(() => {
      showNotification();
    }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed, showNotification]);

  // Auto-dismiss each notification after 5 seconds
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      setNotification(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  const handleClose = () => {
    setNotification(null);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          className="fixed bottom-6 left-6 z-[40] max-w-xs"
          initial={{ opacity: 0, y: 40, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 40, x: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3 rounded-xl bg-white shadow-lg border border-border p-3 pr-4">
            {/* Product Image */}
            <img
              src={notification.productImage}
              alt={notification.productName}
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
            />

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm leading-snug">
                <span className="font-medium text-primary">
                  {notification.name} from {notification.city}
                </span>{' '}
                <span className="text-text-muted">just purchased</span>
              </p>
              <p className="text-sm font-medium text-accent truncate">
                {notification.productName}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-1 rounded-md text-text-muted hover:text-primary hover:bg-bg-secondary transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
