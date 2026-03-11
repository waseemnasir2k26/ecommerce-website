import { NavLink } from 'react-router-dom';
import { X, Instagram, Twitter, Facebook } from 'lucide-react';
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

export default function MobileMenu({ isOpen, onClose }) {
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
            'flex flex-col px-8 pt-6 pb-10'
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
            {mainNav.map((item, i) => (
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
            ))}
          </nav>

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
