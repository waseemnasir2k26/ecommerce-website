import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Truck } from 'lucide-react';
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
          className="relative z-[60] overflow-hidden"
        >
          <div className="bg-primary text-white text-center py-2.5 relative">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2">
              <Truck size={14} className="text-accent-light" />
              <p className="font-body text-xs sm:text-sm tracking-wide">
                Free Shipping on Orders Over $75
                <span className="hidden sm:inline text-white/50 mx-2">|</span>
                <Link
                  to="/shop"
                  className="sm:inline hidden text-accent-light hover:text-white transition font-medium"
                >
                  Shop Now &rarr;
                </Link>
              </p>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className={cn(
                'absolute right-3 sm:right-4 top-1/2 -translate-y-1/2',
                'text-white/40 hover:text-white transition-colors p-1'
              )}
              aria-label="Dismiss announcement"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
