import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, ArrowRight, Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { mainNav } from '../../data/navigation';
import { useCart } from '../../hooks/useCart';
import MobileMenu from './MobileMenu';
import ProductSearch from '../product/ProductSearch';
import CartDrawer from '../cart/CartDrawer';

/* ─── Navigation split: left links | center logo | right links + icons ─── */
const leftNav = ['Shop', 'Collections', 'Lookbook'];
const rightNav = ['About', 'Contact'];

/* ─── Mega-menu animation ─── */
const megaMenuVariants = {
  hidden: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.15, ease: 'easeIn' },
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

  /* Dark hero detection — transparent navbar on homepage & lookbook & collections */
  const darkHeroPages = ['/', '/lookbook', '/collections'];
  const hasDarkHero = darkHeroPages.includes(location.pathname);
  const isTransparent = hasDarkHero && !scrolled;

  /* Scroll listener */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Cart bounce */
  useEffect(() => {
    if (cartCount !== prevCartCount.current && prevCartCount.current !== 0) {
      setCartBounce(true);
      const t = setTimeout(() => setCartBounce(false), 500);
      return () => clearTimeout(t);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  /* Mega-menu hover logic */
  const megaEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    megaMenuTimeout.current = null;
    setMegaMenuOpen(true);
  };
  const megaLeave = () => {
    megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(false), 120);
  };
  const megaClose = () => setMegaMenuOpen(false);

  /* Find the Shop data for mega-menu */
  const shopData = mainNav.find((i) => i.name === 'Shop');
  const shopCategories = shopData?.children?.filter((c) => c.image) || [];

  /* Shared link style */
  const navLinkClass = ({ isActive }) =>
    cn(
      'relative text-[13px] font-body font-medium uppercase tracking-[0.08em] transition-colors duration-300 py-1',
      isActive
        ? 'text-accent'
        : isTransparent
          ? 'text-white/80 hover:text-white'
          : 'text-primary/70 hover:text-primary'
    );

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 z-50 transition-all duration-500',
          hasDarkHero ? 'top-0' : 'top-0',
          scrolled
            ? 'bg-white/90 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border-b border-black/[0.04]'
            : hasDarkHero
              ? 'bg-gradient-to-b from-black/30 to-transparent'
              : 'bg-white border-b border-border/50'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={cn(
            'flex items-center justify-between transition-all duration-500',
            scrolled ? 'h-14' : 'h-16 lg:h-[72px]'
          )}>

            {/* ═══ LEFT: Nav Links (desktop) ═══ */}
            <div className="hidden lg:flex items-center gap-7 flex-1">
              {mainNav
                .filter((item) => leftNav.includes(item.name))
                .map((item) => {
                  if (item.name === 'Shop' && item.children) {
                    return (
                      <div
                        key={item.path}
                        onMouseEnter={megaEnter}
                        onMouseLeave={megaLeave}
                      >
                        <NavLink to={item.path} onClick={megaClose} className={navLinkClass}>
                          {item.name}
                        </NavLink>
                      </div>
                    );
                  }
                  return (
                    <NavLink key={item.path} to={item.path} className={navLinkClass}>
                      {item.name}
                    </NavLink>
                  );
                })}
            </div>

            {/* ═══ CENTER: Logo ═══ */}
            <Link
              to="/"
              className={cn(
                'font-display tracking-[0.15em] transition-all duration-500 flex-shrink-0',
                scrolled ? 'text-xl' : 'text-2xl lg:text-[28px]',
                isTransparent ? 'text-white' : 'text-primary',
                'hover:tracking-[0.25em]'
              )}
            >
              LUXE
            </Link>

            {/* ═══ RIGHT: Nav Links + Icons ═══ */}
            <div className="hidden lg:flex items-center gap-7 flex-1 justify-end">
              {mainNav
                .filter((item) => rightNav.includes(item.name))
                .map((item) => (
                  <NavLink key={item.path} to={item.path} className={navLinkClass}>
                    {item.name}
                  </NavLink>
                ))}

              {/* Divider */}
              <div className={cn(
                'w-px h-4 transition-colors duration-300',
                isTransparent ? 'bg-white/20' : 'bg-border'
              )} />

              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  'transition-colors duration-300',
                  isTransparent ? 'text-white/80 hover:text-white' : 'text-primary/60 hover:text-primary'
                )}
                aria-label="Search"
              >
                <Search size={19} strokeWidth={1.5} />
              </button>

              {/* Wishlist placeholder */}
              <Link
                to="/account"
                className={cn(
                  'transition-colors duration-300',
                  isTransparent ? 'text-white/80 hover:text-white' : 'text-primary/60 hover:text-primary'
                )}
                aria-label="Wishlist"
              >
                <Heart size={19} strokeWidth={1.5} />
              </Link>

              {/* Account */}
              <Link
                to="/account"
                className={cn(
                  'transition-colors duration-300',
                  isTransparent ? 'text-white/80 hover:text-white' : 'text-primary/60 hover:text-primary'
                )}
                aria-label="Account"
              >
                <User size={19} strokeWidth={1.5} />
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className={cn(
                  'relative transition-colors duration-300',
                  isTransparent ? 'text-white/80 hover:text-white' : 'text-primary/60 hover:text-primary',
                  cartBounce && 'animate-bounce-once'
                )}
                aria-label="Cart"
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* ═══ MOBILE: Icons ═══ */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  'transition-colors duration-300 p-1',
                  isTransparent ? 'text-white/80 hover:text-white' : 'text-primary/60 hover:text-primary'
                )}
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className={cn(
                  'relative transition-colors duration-300 p-1',
                  isTransparent ? 'text-white/80 hover:text-white' : 'text-primary/60 hover:text-primary'
                )}
                aria-label="Cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className={cn(
                  'transition-colors duration-300 p-1',
                  isTransparent ? 'text-white/80 hover:text-white' : 'text-primary/60 hover:text-primary'
                )}
                aria-label="Menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </nav>

        {/* ═══════════════════════════════════
            MEGA-MENU
            ═══════════════════════════════════ */}
        <AnimatePresence>
          {megaMenuOpen && shopData && (
            <motion.div
              variants={megaMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-border/30"
              onMouseEnter={megaEnter}
              onMouseLeave={megaLeave}
            >
              <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-12 gap-10">

                  {/* Left: Category Cards Grid */}
                  <div className="col-span-8">
                    <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-text-muted mb-5">
                      Shop by Category
                    </p>
                    <div className="grid grid-cols-5 gap-4">
                      {shopCategories.map((cat) => (
                        <Link
                          key={cat.path}
                          to={cat.path}
                          onClick={megaClose}
                          className="group text-center"
                        >
                          <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-bg-secondary">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <span className="text-xs font-body font-medium text-primary/80 group-hover:text-accent transition-colors duration-200">
                            {cat.name}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Quick links */}
                    <div className="flex items-center gap-6 mt-8 pt-5 border-t border-border/40">
                      <Link
                        to="/shop"
                        onClick={megaClose}
                        className="text-xs font-body font-medium text-primary/60 hover:text-accent transition-colors inline-flex items-center gap-1.5 group"
                      >
                        All Products
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      <Link
                        to="/shop?filter=new"
                        onClick={megaClose}
                        className="text-xs font-body font-medium text-primary/60 hover:text-accent transition-colors"
                      >
                        New Arrivals
                      </Link>
                      <Link
                        to="/shop?filter=sale"
                        onClick={megaClose}
                        className="text-xs font-body font-medium text-accent hover:text-accent-dark transition-colors"
                      >
                        Sale
                      </Link>
                    </div>
                  </div>

                  {/* Right: Featured Card */}
                  {shopData.featured && (
                    <div className="col-span-4">
                      <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-text-muted mb-5">
                        Featured
                      </p>
                      <Link
                        to={shopData.featured.path}
                        onClick={megaClose}
                        className="block rounded-xl overflow-hidden relative group h-full min-h-[260px]"
                      >
                        <img
                          src={shopData.featured.image}
                          alt={shopData.featured.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-[11px] font-mono uppercase tracking-wider text-accent-light mb-2">
                            {shopData.featured.description}
                          </p>
                          <h3 className="font-display text-xl text-white mb-3">
                            {shopData.featured.title}
                          </h3>
                          <span className="inline-flex items-center gap-2 text-white text-sm font-medium group-hover:gap-3 transition-all">
                            Shop Now <ArrowRight size={14} />
                          </span>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer: accounts for fixed header on non-dark-hero pages */}
      {!hasDarkHero && <div className="h-16 lg:h-[72px]" />}

      {/* Overlays */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <ProductSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
