import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu } from 'lucide-react';
import { cn } from '../../utils/cn';
import { mainNav } from '../../data/navigation';
import { useCart } from '../../hooks/useCart';
import MobileMenu from './MobileMenu';
import ProductSearch from '../product/ProductSearch';
import CartDrawer from '../cart/CartDrawer';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm'
            : 'bg-bg'
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="font-display text-2xl font-bold text-primary">
              LUXE
            </Link>

            {/* Center nav links - hidden on mobile */}
            <div className="hidden md:flex items-center gap-8">
              {mainNav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'text-sm font-body tracking-wide transition',
                      'hover:text-accent pb-1',
                      isActive
                        ? 'text-accent border-b-2 border-accent'
                        : 'text-primary'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="text-primary hover:text-accent transition"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Account */}
              <Link
                to="/account"
                className="text-primary hover:text-accent transition hidden sm:block"
                aria-label="Account"
              >
                <User size={20} />
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-primary hover:text-accent transition"
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
                className="md:hidden text-primary hover:text-accent transition"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

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
