import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, ChevronRight, ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { mainNav } from '../../data/navigation';

/* ─── Animation variants ─── */
const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panel = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'tween', duration: 0.4, ease: [0.32, 0.72, 0, 1] } },
  exit: { x: '100%', transition: { type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const fadeSlide = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const shopItem = mainNav.find((item) => item.name === 'Shop');

export default function MobileMenu({ isOpen, onClose }) {
  const [showCategories, setShowCategories] = useState(false);

  /* Lock body scroll */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setShowCategories(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[380px] bg-white flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-border/50">
              <span className="font-display text-lg tracking-[0.1em] text-primary">LUXE</span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center text-primary/60 hover:text-primary hover:bg-border transition-colors"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {!showCategories ? (
                  /* ─── Main Menu ─── */
                  <motion.nav
                    key="main"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="px-6 pt-8"
                  >
                    {mainNav.map((item) => {
                      if (item.name === 'Shop' && item.children) {
                        return (
                          <motion.div key="shop" variants={fadeSlide}>
                            <button
                              onClick={() => setShowCategories(true)}
                              className="w-full flex items-center justify-between py-3 group"
                            >
                              <span className="text-[22px] font-display text-primary group-hover:text-accent transition-colors">
                                Shop
                              </span>
                              <ChevronRight size={20} className="text-text-muted group-hover:text-accent transition-colors" />
                            </button>
                          </motion.div>
                        );
                      }

                      return (
                        <motion.div key={item.path} variants={fadeSlide}>
                          <NavLink
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                              cn(
                                'block py-3 text-[22px] font-display transition-colors',
                                isActive ? 'text-accent' : 'text-primary hover:text-accent'
                              )
                            }
                          >
                            {item.name}
                          </NavLink>
                        </motion.div>
                      );
                    })}

                    {/* Featured Card */}
                    <motion.div variants={fadeSlide} className="mt-8">
                      <Link
                        to="/collections"
                        onClick={onClose}
                        className="block relative rounded-2xl overflow-hidden group"
                      >
                        <div className="aspect-[2/1]">
                          <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
                            alt="New Season"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <p className="text-[10px] font-mono uppercase tracking-wider text-accent-light mb-1">
                            Up to 40% off
                          </p>
                          <p className="font-display text-lg text-white">
                            New Season Collection
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  </motion.nav>
                ) : (
                  /* ─── Categories Sub-Menu ─── */
                  <motion.div
                    key="categories"
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 40, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="px-6 pt-6"
                  >
                    {/* Back button */}
                    <button
                      onClick={() => setShowCategories(false)}
                      className="flex items-center gap-2 text-sm font-body text-text-muted hover:text-primary transition-colors mb-6"
                    >
                      <ChevronRight size={16} className="rotate-180" />
                      Back
                    </button>

                    <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-text-muted mb-4">
                      Categories
                    </p>

                    {/* Category cards */}
                    <div className="space-y-2">
                      {shopItem?.children?.map((cat) => (
                        <NavLink
                          key={cat.path + cat.name}
                          to={cat.path}
                          onClick={onClose}
                          className={({ isActive }) =>
                            cn(
                              'flex items-center gap-4 p-3 rounded-xl transition-colors group',
                              isActive ? 'bg-accent/10' : 'hover:bg-bg-secondary'
                            )
                          }
                        >
                          {cat.image ? (
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-lg bg-bg-secondary flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-mono text-text-muted">ALL</span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <span className="block text-base font-body font-medium text-primary group-hover:text-accent transition-colors">
                              {cat.name}
                            </span>
                          </div>
                          <ArrowRight size={16} className="text-text-muted/40 group-hover:text-accent transition-colors flex-shrink-0" />
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition" aria-label="Instagram">
                    <Instagram size={18} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition" aria-label="Twitter">
                    <Twitter size={18} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition" aria-label="Facebook">
                    <Facebook size={18} />
                  </a>
                </div>
                <Link
                  to="/account"
                  onClick={onClose}
                  className="text-xs font-body text-text-muted hover:text-accent transition"
                >
                  My Account
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
