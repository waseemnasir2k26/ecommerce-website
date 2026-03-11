import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const priceRanges = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200+', min: 200, max: Infinity },
];

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Rating', value: 'rating' },
];

function FilterSection({ title, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full py-1 cursor-pointer group"
      >
        <h3 className="font-display text-sm font-semibold text-primary">
          {title}
        </h3>
        <ChevronDown
          size={16}
          className={cn(
            'text-text-muted transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent/10 text-accent text-xs font-mono rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-accent-dark transition-colors cursor-pointer"
        aria-label={`Remove ${label} filter`}
      >
        <X size={12} />
      </button>
    </span>
  );
}

function FilterContent({ categories, onFilterChange, activeFilters }) {
  const selectedCategories = activeFilters?.categories || [];
  const selectedPriceRange = activeFilters?.priceRange || null;
  const selectedSort = activeFilters?.sort || 'featured';

  const toggleCategory = (category) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    onFilterChange({ ...activeFilters, categories: updated });
  };

  const setPriceRange = (range) => {
    const isSame =
      selectedPriceRange?.min === range.min &&
      selectedPriceRange?.max === range.max;

    onFilterChange({
      ...activeFilters,
      priceRange: isSame ? null : range,
    });
  };

  const setSort = (value) => {
    onFilterChange({ ...activeFilters, sort: value });
  };

  const clearAll = () => {
    onFilterChange({ categories: [], priceRange: null, sort: 'featured' });
  };

  const activeChips = [];
  selectedCategories.forEach((cat) => {
    activeChips.push({
      label: cat,
      onRemove: () => toggleCategory(cat),
    });
  });
  if (selectedPriceRange) {
    const rangeLabel = priceRanges.find(
      (r) =>
        r.min === selectedPriceRange.min && r.max === selectedPriceRange.max
    )?.label;
    if (rangeLabel) {
      activeChips.push({
        label: rangeLabel,
        onRemove: () =>
          onFilterChange({ ...activeFilters, priceRange: null }),
      });
    }
  }

  return (
    <div>
      {/* Active Filters */}
      {activeChips.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted font-mono uppercase tracking-wider">
              Active Filters
            </span>
            <button
              onClick={clearAll}
              className="text-xs text-accent hover:text-accent-dark font-body transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {activeChips.map((chip) => (
              <FilterChip
                key={chip.label}
                label={chip.label}
                onRemove={chip.onRemove}
              />
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <FilterSection title="Categories">
        <div className="flex flex-col gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <label
                key={category}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded border flex items-center justify-center transition-all',
                    isSelected
                      ? 'bg-accent border-accent'
                      : 'border-border group-hover:border-primary'
                  )}
                >
                  {isSelected && <Check size={12} className="text-white" />}
                </div>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleCategory(category)}
                  className="sr-only"
                />
                <span className="font-body text-sm text-text-secondary capitalize group-hover:text-primary transition-colors">
                  {category}
                </span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="flex flex-col gap-2">
          {priceRanges.map((range) => {
            const isSelected =
              selectedPriceRange?.min === range.min &&
              selectedPriceRange?.max === range.max;
            return (
              <label
                key={range.label}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border flex items-center justify-center transition-all',
                    isSelected
                      ? 'border-accent'
                      : 'border-border group-hover:border-primary'
                  )}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  )}
                </div>
                <input
                  type="radio"
                  name="priceRange"
                  checked={isSelected}
                  onChange={() => setPriceRange(range)}
                  className="sr-only"
                />
                <span className="font-body text-sm text-text-secondary group-hover:text-primary transition-colors">
                  {range.label}
                </span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      {/* Sort By */}
      <FilterSection title="Sort By">
        <div className="flex flex-col gap-2">
          {sortOptions.map((option) => {
            const isSelected = selectedSort === option.value;
            return (
              <label
                key={option.value}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border flex items-center justify-center transition-all',
                    isSelected
                      ? 'border-accent'
                      : 'border-border group-hover:border-primary'
                  )}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  )}
                </div>
                <input
                  type="radio"
                  name="sortBy"
                  checked={isSelected}
                  onChange={() => setSort(option.value)}
                  className="sr-only"
                />
                <span className="font-body text-sm text-text-secondary group-hover:text-primary transition-colors">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </FilterSection>
    </div>
  );
}

export default function ProductFilter({
  categories = [],
  onFilterChange,
  activeFilters = {},
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  // ── Desktop Sidebar ───────────────────────────────────────────────
  if (!isMobile) {
    return (
      <aside className="w-full">
        <div className="flex items-center gap-2 mb-5">
          <SlidersHorizontal size={18} className="text-primary" />
          <h2 className="font-display text-lg text-primary">Filters</h2>
        </div>
        <FilterContent
          categories={categories}
          onFilterChange={onFilterChange}
          activeFilters={activeFilters}
        />
      </aside>
    );
  }

  // ── Mobile Bottom Sheet ───────────────────────────────────────────
  return (
    <>
      {/* Mobile Trigger */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-lg font-body text-sm text-primary hover:border-primary transition-colors cursor-pointer"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-border rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-primary" />
                  <h2 className="font-display text-lg text-primary">Filters</h2>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 rounded-lg text-text-secondary hover:bg-bg-secondary hover:text-primary transition-colors cursor-pointer"
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="px-5 py-4">
                <FilterContent
                  categories={categories}
                  onFilterChange={onFilterChange}
                  activeFilters={activeFilters}
                />
              </div>

              {/* Apply Button */}
              <div className="px-5 py-4 border-t border-border">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full py-3 bg-primary text-white font-body font-medium rounded-lg hover:bg-primary-light transition-colors cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
