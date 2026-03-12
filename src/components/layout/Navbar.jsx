import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { mainNav } from '../../data/navigation';
import { useCart } from '../../hooks/useCart';
import MobileMenu from './MobileMenu';
import ProductSearch from '../product/ProductSearch';
import CartDrawer from '../cart/CartDrawer';

const megaMenuVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const prevCartCount = useRef(0);
  const megaMenuTimeout = useRef(null);

  const { cartCount } = useCart();
  const location = useLocation();

  // Determine if we're on a page with a dark hero (home page)
  const hasDarkHero = location.pathname === '/';

  // Should the navbar be in its transparent "over dark hero" state?
  const isTransparent = hasDarkHero && !scrolled;

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart bounce animation when count changes
  useEffect(() => {
    if (cartCount !== prevCartCount.current && prevCartCount.current !== 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 600);
      return () => clearTimeout(timer);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  // Mega menu hover handlers with delay for UX
  const handleMegaMenuEnter = () => {
    if (megaMenuTimeout.current) {
      clearTimeout(megaMenuTimeout.current);
      megaMenuTimeout.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeout.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  // Close mega menu on link click
  const closeMegaMenu = () => {
    setMegaMenuOpen(false);
  };

  // Find the "Shop" item in mainNav
  const shopItem = mainNav.find((item) => item.name === 'Shop');

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/70 backdrop-blur-xl border-b border-border/50 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className={cn(
                'font-display text-2xl font-bold transition-all duration-300',
                'hover:tracking-widest',
                isTransparent ? 'text-white' : 'text-primary'
              )}
            >
              LUXE
            </Link>

            {/* Center nav links - hidden on mobile */}
            <div className="hidden md:flex items-center gap-8">
              {mainNav.map((item) => {
                const isShop = item.name === 'Shop' && item.children;

                if (isShop) {
                  return (
                    <div
                      key={item.path}
                      className="relative"
                      onMouseEnter={handleMegaMenuEnter}
                      onMouseLeave={handleMegaMenuLeave}
                    >
                      <NavLink
                        to={item.path}
                        onClick={closeMegaMenu}
                        className={({ isActive }) =>
                          cn(
                            'text-sm font-body tracking-wide transition-colors duration-300',
                            'underline-grow pb-1',
                            isActive
                              ? 'text-accent'
                              : isTransparent
                                ? 'text-white/90 hover:text-white'
                                : 'text-primary hover:text-accent'
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        'text-sm font-body tracking-wide transition-colors duration-300',
                        'underline-grow pb-1',
                        isActive
                          ? 'text-accent'
                          : isTransparent
                            ? 'text-white/90 hover:text-white'
                            : 'text-primary hover:text-accent'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  'transition-colors duration-300',
                  isTransparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-primary hover:text-accent'
                )}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Account */}
              <Link
                to="/account"
                className={cn(
                  'hidden sm:block transition-colors duration-300',
                  isTransparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-primary hover:text-accent'
                )}
                aria-label="Account"
              >
                <User size={20} />
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className={cn(
                  'relative transition-colors duration-300',
                  isTransparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-primary hover:text-accent',
                  cartBounce && 'animate-bounce'
                )}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span
                    className={cn(
                      'absolute -top-2 -right-2',
                      'bg-accent text-white text-xs rounded-full',
                      'w-5 h-5 flex items-center justify-center',
                      'font-body font-medium'
                    )}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={cn(
                  'md:hidden transition-colors duration-300',
                  isTransparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-primary hover:text-accent'
                )}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Mega-Menu Dropdown */}
        <AnimatePresence>
          {megaMenuOpen && shopItem && (
            <motion.div
              variants={megaMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl shadow-2xl border-t border-border/30"
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8">
                {/* Left: Category Links */}
                <div className="col-span-7">
                  <div className="grid grid-cols-3 gap-4">
                    {shopItem.children.map((category) => (
                      <Link
                        key={category.path}
                        to={category.path}
                        onClick={closeMegaMenu}
                        className="flex items-center gap-3 group p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
                      >
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-transparent group-hover:ring-accent/30 transition-all duration-300"
                          />
                        ) : null}
                        <span className="font-body font-medium text-sm text-primary group-hover:text-accent transition-colors duration-200">
                          {category.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right: Featured Promotional Card */}
                {shopItem.featured && (
                  <div className="col-span-5">
                    <Link
                      to={shopItem.featured.path}
                      onClick={closeMegaMenu}
                      className="block rounded-xl overflow-hidden relative group"
                    >
                      <div className="aspect-[16/9] w-full">
                        <img
                          src={shopItem.featured.image}
                          alt={shopItem.featured.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      {/* Text content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="font-display text-xl text-white mb-1">
                          {shopItem.featured.title}
                        </h3>
                        <p className="text-white/70 text-sm font-body">
                          {shopItem.featured.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to account for fixed navbar when NOT on dark hero pages */}
      {!hasDarkHero && <div className="h-16" />}

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Search overlay */}
      <ProductSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Cart drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}
