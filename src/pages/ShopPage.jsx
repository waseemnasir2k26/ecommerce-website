import { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  ChevronRight,
  X,
  Search,
  PackageOpen,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { setPageSEO } from '../utils/seo';
import products from '../data/products';
import categories from '../data/categories';
import ProductCard from '../components/product/ProductCard';

const PRICE_RANGES = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under $50', value: 'under-50', min: 0, max: 50 },
  { label: '$50 – $100', value: '50-100', min: 50, max: 100 },
  { label: '$100 – $200', value: '100-200', min: 100, max: 200 },
  { label: '$200 – $500', value: '200-500', min: 200, max: 500 },
  { label: 'Over $500', value: 'over-500', min: 500, max: Infinity },
];

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Top Rated', value: 'top-rated' },
];

function getCategoryCount(categoryId) {
  return products.filter((p) => p.category === categoryId).length;
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Filter Sidebar (shared between desktop & mobile)                        */
/* ────────────────────────────────────────────────────────────────────────── */
function FilterSidebar({
  activeCategory,
  setActiveCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  clearFilters,
}) {
  return (
    <div className="space-y-0">
      {/* Search */}
      <div className="pb-6 mb-6 border-b border-border">
        <h3 className="font-display text-sm uppercase tracking-wider text-text-muted mb-3">
          Search
        </h3>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-bg-secondary text-sm font-body text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="pb-6 mb-6 border-b border-border">
        <h3 className="font-display text-sm uppercase tracking-wider text-text-muted mb-3">
          Categories
        </h3>
        <ul className="space-y-1.5">
          <li>
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-body transition-colors cursor-pointer',
                activeCategory === 'all'
                  ? 'text-accent font-semibold bg-accent/5'
                  : 'text-text-secondary hover:text-primary hover:bg-bg-secondary'
              )}
            >
              <span>All</span>
              <span className="font-mono text-xs text-text-muted">
                {products.length}
              </span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-body transition-colors cursor-pointer',
                  activeCategory === cat.id
                    ? 'text-accent font-semibold bg-accent/5'
                    : 'text-text-secondary hover:text-primary hover:bg-bg-secondary'
                )}
              >
                <span>{cat.name}</span>
                <span className="font-mono text-xs text-text-muted">
                  {getCategoryCount(cat.id)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="pb-6 mb-6 border-b border-border">
        <h3 className="font-display text-sm uppercase tracking-wider text-text-muted mb-3">
          Price Range
        </h3>
        <ul className="space-y-1.5">
          {PRICE_RANGES.map((range) => (
            <li key={range.value}>
              <button
                onClick={() => setPriceRange(range.value)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-body transition-colors cursor-pointer',
                  priceRange === range.value
                    ? 'text-accent font-semibold bg-accent/5'
                    : 'text-text-secondary hover:text-primary hover:bg-bg-secondary'
                )}
              >
                <span
                  className={cn(
                    'w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                    priceRange === range.value
                      ? 'border-accent'
                      : 'border-border'
                  )}
                >
                  {priceRange === range.value && (
                    <span className="w-2 h-2 rounded-full bg-accent" />
                  )}
                </span>
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sort By */}
      <div className="pb-6 mb-6 border-b border-border">
        <h3 className="font-display text-sm uppercase tracking-wider text-text-muted mb-3">
          Sort By
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-secondary text-sm font-body text-primary focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full py-2.5 rounded-lg border border-border text-sm font-body text-text-secondary hover:text-primary hover:border-primary transition-colors cursor-pointer"
      >
        Clear All Filters
      </button>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  ShopPage                                                                 */
/* ────────────────────────────────────────────────────────────────────────── */
export default function ShopPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync URL param category changes
  useEffect(() => {
    if (category) {
      setActiveCategory(category);
    }
  }, [category]);

  // Page SEO
  useEffect(() => {
    const activeCat = categories.find((c) => c.id === activeCategory);
    const categoryName = activeCat?.name;
    setPageSEO({
      title: categoryName ? `Shop ${categoryName}` : 'Shop All Products',
      description: 'Browse our curated collection of premium products. Filter by category, price, and more. Free shipping on orders over $75.',
      canonical: activeCategory !== 'all'
        ? `https://luxestore.com/shop/${activeCategory}`
        : 'https://luxestore.com/shop',
    });
  }, [activeCategory]);

  // Lock body scroll when mobile filter panel is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterOpen]);

  const clearFilters = () => {
    setActiveCategory('all');
    setSortBy('featured');
    setPriceRange('all');
    setSearchQuery('');
  };

  // ── Derive filtered & sorted products ──────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Price range
    if (priceRange !== 'all') {
      const range = PRICE_RANGES.find((r) => r.value === priceRange);
      if (range) {
        result = result.filter(
          (p) => p.price >= range.min && p.price < range.max
        );
      }
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case 'top-rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured — keep original order
        break;
    }

    return result;
  }, [activeCategory, sortBy, priceRange, searchQuery]);

  const activeCategoryData = categories.find((c) => c.id === activeCategory);
  const categoryTitle =
    activeCategory === 'all' ? 'Shop All' : activeCategoryData?.name || 'Shop';

  const filterProps = {
    activeCategory,
    setActiveCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    clearFilters,
  };

  return (
    <main>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section aria-label="Shop header" className="py-12 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-body text-text-muted mb-4">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link to="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            {activeCategory !== 'all' && activeCategoryData && (
              <>
                <ChevronRight size={14} />
                <span className="text-primary">{activeCategoryData.name}</span>
              </>
            )}
          </nav>

          <h1 className="font-display text-4xl text-primary">{categoryTitle}</h1>
          <p className="text-text-secondary font-body mt-2">
            Showing {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </section>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Mobile filter button */}
        <div className="lg:hidden mb-6 flex items-center justify-between">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border font-body text-sm text-primary hover:bg-bg-secondary transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          {/* Mobile sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-border bg-white text-sm font-body text-primary focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ── Desktop Sidebar ────────────────────────────────────────── */}
          <aside className="hidden lg:block col-span-1">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal size={18} className="text-primary" />
                <h2 className="font-display text-lg text-primary">Filters</h2>
              </div>
              <FilterSidebar {...filterProps} />
            </div>
          </aside>

          {/* ── Product Grid ───────────────────────────────────────────── */}
          <section aria-label="Product listing" className="col-span-1 lg:col-span-3">
            {/* Desktop top bar */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-sm font-body text-text-secondary">
                {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-white text-sm font-body text-primary focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* ── Empty State ─────────────────────────────────────────── */
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-full bg-bg-secondary flex items-center justify-center mb-6">
                  <PackageOpen size={32} className="text-text-muted" />
                </div>
                <h3 className="font-display text-xl text-primary mb-2">
                  No products found
                </h3>
                <p className="font-body text-text-secondary max-w-sm mb-6">
                  We couldn't find any products matching your current filters.
                  Try adjusting your search or clearing the filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ── Mobile Filter Panel ────────────────────────────────────────── */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="filter-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />

            {/* Panel */}
            <motion.div
              key="filter-panel"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 top-16 bg-white z-50 lg:hidden rounded-t-2xl shadow-2xl flex flex-col"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-primary" />
                  <h2 className="font-display text-lg text-primary">Filters</h2>
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-9 h-9 rounded-full bg-bg-secondary flex items-center justify-center text-text-muted hover:text-primary transition-colors cursor-pointer"
                  aria-label="Close filters"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Panel Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <FilterSidebar {...filterProps} />
              </div>

              {/* Panel Footer */}
              <div className="flex-shrink-0 px-6 py-4 border-t border-border">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors cursor-pointer"
                >
                  Show {filteredProducts.length}{' '}
                  {filteredProducts.length === 1 ? 'product' : 'products'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
