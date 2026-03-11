import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="sticky top-0 z-50 overflow-hidden"
        >
          <div
            className={cn(
              'bg-primary text-white text-sm text-center py-2',
              'relative flex items-center justify-center px-6'
            )}
          >
            <p className="font-body">
              Free Shipping on Orders Over $75 |{' '}
              <Link
                to="/shop"
                className="underline underline-offset-2 hover:text-accent-light transition"
              >
                Shop Now &rarr;
              </Link>
            </p>

            <button
              onClick={() => setIsVisible(false)}
              className={cn(
                'absolute right-4 top-1/2 -translate-y-1/2',
                'text-white/70 hover:text-white transition'
              )}
              aria-label="Dismiss announcement"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
