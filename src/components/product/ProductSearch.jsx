import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useSearch } from '../../hooks/useSearch';
import products from '../../data/products';
import ProductCard from './ProductCard';

const recentSearches = [
  'Wireless headphones',
  'Oxford shirt',
  'Leather wallet',
  'Yoga mat',
];

export default function ProductSearch({ isOpen, onClose }) {
  const inputRef = useRef(null);
  const { query, results, search, clearSearch } = useSearch(products);
  const [inputValue, setInputValue] = useState('');

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setInputValue(value);
      search(value);
    },
    [search]
  );

  const handleClear = useCallback(() => {
    setInputValue('');
    clearSearch();
    inputRef.current?.focus();
  }, [clearSearch]);

  const handleRecentSearch = useCallback(
    (term) => {
      setInputValue(term);
      search(term);
    },
    [search]
  );

  const handleClose = useCallback(() => {
    setInputValue('');
    clearSearch();
    onClose();
  }, [clearSearch, onClose]);

  const hasSearched = inputValue.trim().length > 0;
  const hasResults = results.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="max-w-5xl mx-auto px-4 py-6 h-full flex flex-col">
            {/* Search Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-12 py-4 text-lg font-body bg-bg-secondary rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all placeholder:text-text-muted text-primary"
                />
                {inputValue && (
                  <button
                    onClick={handleClear}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-text-muted hover:text-primary hover:bg-white transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <button
                onClick={handleClose}
                className="px-4 py-4 font-body text-sm text-text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              {/* No search yet: show recent searches */}
              {!hasSearched && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="font-display text-sm text-text-muted uppercase tracking-wider mb-3">
                    Recent Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleRecentSearch(term)}
                        className="px-4 py-2 bg-bg-secondary rounded-full font-body text-sm text-text-secondary hover:text-primary hover:bg-border/50 transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Has searched with results */}
              {hasSearched && hasResults && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-body text-sm text-text-muted mb-4">
                    {results.length} result{results.length !== 1 ? 's' : ''} for{' '}
                    <span className="font-medium text-primary">
                      "{inputValue}"
                    </span>
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Has searched with no results */}
              {hasSearched && !hasResults && (
                <motion.div
                  className="flex flex-col items-center justify-center py-20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center mb-4">
                    <Search size={24} className="text-text-muted" />
                  </div>
                  <h3 className="font-display text-lg text-primary mb-1">
                    No results found
                  </h3>
                  <p className="font-body text-sm text-text-muted text-center max-w-sm">
                    We couldn't find any products matching "{inputValue}". Try a
                    different search term.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
