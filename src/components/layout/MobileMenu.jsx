import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, Instagram, Twitter, Facebook, ChevronDown, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { mainNav } from '../../data/navigation';

const overlayVariants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
  exit: { x: '100%' },
};

const linkVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.3, ease: 'easeOut' },
  }),
};

const socialVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + mainNav.length * 0.08 + 0.1, duration: 0.3 },
  },
};

const subcategoryVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// Find the Shop item to get subcategories
const shopItem = mainNav.find((item) => item.name === 'Shop');

export default function MobileMenu({ isOpen, onClose }) {
  const [shopExpanded, setShopExpanded] = useState(false);

  // Lock body scroll when menu is open
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

  // Reset shop expanded state when menu closes
  useEffect(() => {
    if (!isOpen) {
      setShopExpanded(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
          className={cn(
            'fixed inset-0 z-50 bg-white',
            'flex flex-col px-8 pt-6 pb-10 overflow-y-auto'
          )}
        >
          {/* Close button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-primary hover:text-accent transition"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-6 mt-12 flex-1">
            {mainNav.map((item, i) => {
              const isShop = item.name === 'Shop' && item.children;

              if (isShop) {
                return (
                  <motion.div
                    key={item.path}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Shop header with expand toggle */}
                    <button
                      onClick={() => setShopExpanded((prev) => !prev)}
                      className={cn(
                        'flex items-center justify-between w-full text-2xl font-display tracking-wide transition',
                        'hover:text-accent text-primary'
                      )}
                    >
                      <span>{item.name}</span>
                      <motion.span
                        animate={{ rotate: shopExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={22} />
                      </motion.span>
                    </button>

                    {/* Expandable subcategories */}
                    <AnimatePresence>
                      {shopExpanded && (
                        <motion.div
                          variants={subcategoryVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-3 mt-4 ml-4 border-l-2 border-accent/20 pl-4">
                            {shopItem.children.map((sub) => (
                              <NavLink
                                key={sub.path + sub.name}
                                to={sub.path}
                                onClick={onClose}
                                className={({ isActive }) =>
                                  cn(
                                    'text-base font-body tracking-wide transition',
                                    'hover:text-accent',
                                    isActive ? 'text-accent' : 'text-text-secondary'
                                  )
                                }
                              >
                                {sub.name}
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={item.path}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'text-2xl font-display tracking-wide transition',
                        'hover:text-accent',
                        isActive ? 'text-accent' : 'text-primary'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                </motion.div>
              );
            })}
          </nav>

          {/* Featured banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.15 + mainNav.length * 0.08, duration: 0.3 },
            }}
            className="my-6"
          >
            <Link
              to="/collections"
              onClick={onClose}
              className="block rounded-xl bg-accent/10 p-5 group"
            >
              <p className="font-display text-lg text-primary mb-1">
                New Season Collection
              </p>
              <p className="font-body text-sm text-text-secondary mb-3">
                Up to 40% Off select styles
              </p>
              <span className="inline-flex items-center gap-2 text-accent font-body text-sm font-medium group-hover:gap-3 transition-all duration-200">
                Shop Now
                <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={socialVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-5 pt-8 border-t border-border"
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
