import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Star,
  Heart,
  Minus,
  Plus,
  ChevronDown,
  ShoppingBag,
  Check,
  ArrowLeft,
  Shield,
  RotateCcw,
  Truck,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { formatPrice } from '../utils/formatPrice';
import { setPageSEO } from '../utils/seo';
import { useCart } from '../hooks/useCart';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import products from '../data/products';
import categories from '../data/categories';
import ProductCard from '../components/product/ProductCard';
import Badge from '../components/ui/Badge';
import RecentlyViewed from '../components/sections/RecentlyViewed';

const badgeVariantMap = {
  New: 'new',
  Sale: 'sale',
  Bestseller: 'bestseller',
};

/* ────────────────────────────────────────────────────────────────────────── */
/*  Mock Reviews                                                             */
/* ────────────────────────────────────────────────────────────────────────── */
const MOCK_REVIEWS = [
  {
    id: 1,
    name: 'Sarah M.',
    date: 'February 18, 2026',
    rating: 5,
    comment:
      'Absolutely love the quality! Exceeded my expectations. The materials feel premium and the attention to detail is remarkable. Would buy again without hesitation.',
  },
  {
    id: 2,
    name: 'James K.',
    date: 'January 30, 2026',
    rating: 4,
    comment:
      'Great product overall. Shipping was fast and the packaging was solid. Only minor thing is I wish there were more color options, but the quality is top-notch.',
  },
  {
    id: 3,
    name: 'Emily R.',
    date: 'January 12, 2026',
    rating: 5,
    comment:
      'This is exactly what I was looking for. Perfect fit, fantastic build quality, and it looks even better in person than in the photos. Highly recommend!',
  },
];

/* ────────────────────────────────────────────────────────────────────────── */
/*  Mock Specifications                                                      */
/* ────────────────────────────────────────────────────────────────────────── */
const MOCK_SPECS = [
  { label: 'Material', value: 'Premium quality materials' },
  { label: 'Dimensions', value: 'Standard sizing' },
  { label: 'Weight', value: 'Lightweight design' },
  { label: 'Origin', value: 'Designed in USA' },
  { label: 'Warranty', value: '1-year limited warranty' },
  { label: 'Care', value: 'See product label for care instructions' },
];

/* ────────────────────────────────────────────────────────────────────────── */
/*  Star Rating                                                              */
/* ────────────────────────────────────────────────────────────────────────── */
function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i < Math.round(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          )}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Accordion Section                                                        */
/* ────────────────────────────────────────────────────────────────────────── */
function AccordionSection({ title, isOpen, onToggle, children }) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
      >
        <h3 className="font-display text-base text-primary group-hover:text-accent transition-colors">
          {title}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-text-muted" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 font-body text-text-secondary text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Color swatch helper — maps color names to tailwind-friendly hex          */
/* ────────────────────────────────────────────────────────────────────────── */
const COLOR_MAP = {
  'Matte Black': '#1a1a1a',
  Black: '#111111',
  Silver: '#c0c0c0',
  'Midnight Blue': '#191970',
  White: '#ffffff',
  'Light Blue': '#add8e6',
  Pink: '#ffc0cb',
  Navy: '#001f3f',
  'Forest Green': '#228b22',
  Charcoal: '#36454f',
  Burgundy: '#800020',
  'Heather Grey': '#b6b6b4',
  Sand: '#c2b280',
  Tan: '#d2b48c',
  'Dark Brown': '#654321',
  'Gold/Green': '#b8860b',
  'Silver/Blue': '#6a8eae',
  'Black/Grey': '#3d3d3d',
  Olive: '#808000',
  'Navy Blue': '#000080',
  Natural: '#f5f5dc',
  'Grey Wash': '#a9a9a9',
  'Bleached White': '#f5f5f0',
  'Matte White': '#f5f5f5',
  'Speckled Grey': '#9e9e9e',
  Terracotta: '#e2725b',
  Oatmeal: '#d3c4a5',
  'Dusty Rose': '#dcae96',
  'Slate Blue': '#6a5acd',
  'Sage Green': '#9caf88',
  'Black/Lime': '#1a1a1a',
  'Grey/Orange': '#808080',
  'Navy/Teal': '#003f5c',
  'Alpine White': '#f0f0f0',
  'Ocean Blue': '#0077be',
  Sage: '#9caf88',
  'Midnight Purple': '#4b0082',
  'Sky Blue/Grey': '#87ceeb',
  'Orange/Charcoal': '#ff8c00',
  'Forest Green/Tan': '#228b22',
  'Coral Red': '#ff6f61',
  'Olive Green': '#556b2f',
};

function getSwatchColor(colorName) {
  return COLOR_MAP[colorName] || '#cccccc';
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  ProductDetailPage                                                        */
/* ────────────────────────────────────────────────────────────────────────── */
export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addToCart, isInCart } = useCart();
  const { addRecentlyViewed } = useRecentlyViewed();

  const product = products.find((p) => p.slug === slug);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('description');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const addToCartRef = useRef(null);

  // Sticky bar: observe main Add to Cart button
  useEffect(() => {
    if (!addToCartRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(addToCartRef.current);
    return () => observer.disconnect();
  }, [product]);

  // Initialise defaults once product is available
  useEffect(() => {
    if (product) {
      if (product.colors?.length > 0) setSelectedColor(product.colors[0]);
      if (product.sizes?.length > 0) setSelectedSize(product.sizes[0]);
    }
  }, [product?.id]);

  // Track recently viewed product
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
    }
  }, [product?.id]);

  // Page SEO
  useEffect(() => {
    if (product) {
      const truncatedDesc = product.description.length > 160
        ? product.description.slice(0, 157) + '...'
        : product.description;
      setPageSEO({
        title: product.name,
        description: truncatedDesc,
        canonical: `https://luxestore.com/product/${product.slug}`,
        ogImage: product.images?.[0] || undefined,
      });
    } else {
      setPageSEO({
        title: 'Product Not Found',
        description: 'The product you are looking for could not be found.',
      });
    }
  }, [product]);

  // Detect if already in cart
  const inCart = product ? isInCart(product.id) : false;

  // Related products
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // Category data
  const categoryData = product
    ? categories.find((c) => c.id === product.category)
    : null;

  /* ── Handlers ────────────────────────────────────────────────────────── */
  const handleAddToCart = () => {
    if (inCart || addedToCart) return;
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => Math.max(1, q - 1));

  const toggleAccordion = (section) => {
    setOpenAccordion((prev) => (prev === section ? null : section));
  };

  /* ── Not Found ───────────────────────────────────────────────────────── */
  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="font-display text-3xl text-primary mb-4">
            Product Not Found
          </h1>
          <p className="font-body text-text-secondary mb-8">
            Sorry, we couldn't find the product you're looking for. It may have
            been removed or the link is incorrect.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const {
    name,
    price,
    originalPrice,
    rating,
    reviewCount,
    description,
    features,
    colors,
    sizes,
    badge,
    images,
  } = product;

  const hasImage =
    images && images.length > 0 && !images[0].includes('placeholder');

  return (
    <main>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ── Breadcrumb ───────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-body text-text-muted mb-8 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          {categoryData && (
            <>
              <ChevronRight size={14} />
              <Link
                to={`/shop/${product.category}`}
                className="hover:text-primary transition-colors"
              >
                {categoryData.name}
              </Link>
            </>
          )}
          <ChevronRight size={14} />
          <span className="text-primary truncate max-w-[200px]">{name}</span>
        </nav>

        {/* ── Product Section ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── Left: Gallery ──────────────────────────────────────────── */}
          <div>
            {/* Main Image */}
            <motion.div
              className="aspect-square bg-bg-secondary rounded-2xl overflow-hidden relative group cursor-crosshair"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {hasImage ? (
                <img
                  src={images[activeThumb] || images[0]}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl text-text-muted/30 select-none text-center px-8 leading-tight">
                    {name}
                  </span>
                </div>
              )}

              {/* Badge */}
              {badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant={badgeVariantMap[badge] || 'default'}>
                    {badge}
                  </Badge>
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThumb(idx)}
                  className={cn(
                    'w-20 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer',
                    activeThumb === idx
                      ? 'border-accent ring-2 ring-accent/20'
                      : 'border-border hover:border-accent/50'
                  )}
                >
                  <img
                    src={imgUrl}
                    alt={`${name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Product Info ────────────────────────────────────── */}
          <div>
            {/* Badge */}
            {badge && (
              <div className="mb-3">
                <Badge variant={badgeVariantMap[badge] || 'default'}>
                  {badge}
                </Badge>
              </div>
            )}

            {/* Stock Urgency for Bestsellers */}
            {badge === 'Bestseller' && (
              <div className="flex items-center gap-2 mb-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="font-body text-orange-600 font-medium">Only a few left in stock</span>
              </div>
            )}

            {/* Name */}
            <h1 className="font-display text-3xl lg:text-4xl text-primary mb-3">
              {name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={rating} size={18} />
              <a
                href="#reviews"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenAccordion('reviews');
                  document
                    .getElementById('product-details')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-body text-text-muted hover:text-accent transition-colors underline underline-offset-2"
              >
                {reviewCount} reviews
              </a>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              {originalPrice && originalPrice > price && (
                <span className="font-mono text-xl text-text-muted line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
              <span
                className={cn(
                  'font-mono text-2xl font-semibold',
                  originalPrice && originalPrice > price
                    ? 'text-error'
                    : 'text-primary'
                )}
              >
                {formatPrice(price)}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-xs font-mono text-white bg-error rounded-full px-2.5 py-0.5">
                  {Math.round(((originalPrice - price) / originalPrice) * 100)}%
                  OFF
                </span>
              )}
              {originalPrice && originalPrice > price && (
                <span className="text-sm font-body text-success font-medium">
                  You save {formatPrice(originalPrice - price)}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="font-body text-text-secondary leading-relaxed mt-4 mb-0">
              {description.length > 200
                ? description.slice(0, 200) + '...'
                : description}
            </p>

            {/* Estimated Delivery */}
            <div className="flex items-center gap-2 mt-4 text-sm">
              <Truck size={16} className="text-success" />
              <span className="font-body text-text-secondary">
                Order within <span className="font-medium text-primary">{23 - new Date().getHours()} hours</span> for delivery by <span className="font-medium text-primary">{new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-border my-6" />

            {/* Color Selector */}
            {colors && colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-body text-sm font-medium text-primary mb-3">
                  Color:{' '}
                  <span className="text-text-secondary font-normal">
                    {selectedColor}
                  </span>
                </h3>
                <div className="flex items-center gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'w-8 h-8 rounded-full border-2 transition-all cursor-pointer',
                        selectedColor === color
                          ? 'ring-2 ring-accent ring-offset-2 border-accent'
                          : 'border-border hover:border-text-muted'
                      )}
                      style={{ backgroundColor: getSwatchColor(color) }}
                      aria-label={color}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {sizes && sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-body text-sm font-medium text-primary mb-3">
                  Size:{' '}
                  <span className="text-text-secondary font-normal">
                    {selectedSize}
                  </span>
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'px-4 py-2 border rounded-lg text-sm font-body transition-all cursor-pointer',
                        selectedSize === size
                          ? 'bg-primary text-white border-primary'
                          : 'border-border text-text-secondary hover:border-primary hover:text-primary'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="font-body text-sm font-medium text-primary mb-3">
                Quantity
              </h3>
              <div className="inline-flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={decrementQty}
                  className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-primary hover:bg-bg-secondary transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 h-10 flex items-center justify-center font-mono text-sm text-primary border-x border-border">
                  {quantity}
                </span>
                <button
                  onClick={incrementQty}
                  className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-primary hover:bg-bg-secondary transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              ref={addToCartRef}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={cn(
                'w-full py-4 rounded-lg text-lg font-medium transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer mt-6',
                inCart || addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-primary text-white hover:bg-primary-light'
              )}
            >
              {inCart || addedToCart ? (
                <>
                  <Check size={20} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag size={20} />
                  Add to Cart
                </>
              )}
            </motion.button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlisted((prev) => !prev)}
              className={cn(
                'w-full py-3.5 rounded-lg text-sm font-medium border transition-all duration-200 flex items-center justify-center gap-2 mt-3 cursor-pointer',
                isWishlisted
                  ? 'border-red-300 text-red-500 bg-red-50'
                  : 'border-border text-text-secondary hover:border-primary hover:text-primary'
              )}
            >
              <Heart
                size={18}
                className={isWishlisted ? 'fill-current' : ''}
              />
              {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-text-secondary">
                <Shield size={16} className="text-accent" strokeWidth={1.5} />
                <span className="text-xs font-body">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <RotateCcw size={16} className="text-accent" strokeWidth={1.5} />
                <span className="text-xs font-body">30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Truck size={16} className="text-accent" strokeWidth={1.5} />
                <span className="text-xs font-body">Free Shipping $75+</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Product Details Accordion ─────────────────────────────────── */}
        <div id="product-details" className="mt-12 max-w-3xl">
          {/* Description */}
          <AccordionSection
            title="Description"
            isOpen={openAccordion === 'description'}
            onToggle={() => toggleAccordion('description')}
          >
            <p className="mb-4">{description}</p>
            {features && features.length > 0 && (
              <ul className="list-disc list-inside space-y-1.5 mt-4">
                {features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            )}
          </AccordionSection>

          {/* Specifications */}
          <AccordionSection
            title="Specifications"
            isOpen={openAccordion === 'specifications'}
            onToggle={() => toggleAccordion('specifications')}
          >
            <table className="w-full text-sm">
              <tbody>
                {MOCK_SPECS.map((spec, idx) => (
                  <tr
                    key={idx}
                    className={cn(
                      idx % 2 === 0 ? 'bg-bg-secondary/50' : 'bg-transparent'
                    )}
                  >
                    <td className="py-2.5 px-3 font-medium text-primary w-1/3">
                      {spec.label}
                    </td>
                    <td className="py-2.5 px-3 text-text-secondary">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AccordionSection>

          {/* Reviews */}
          <AccordionSection
            title={`Reviews (${reviewCount})`}
            isOpen={openAccordion === 'reviews'}
            onToggle={() => toggleAccordion('reviews')}
          >
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={rating} size={20} />
              <span className="font-mono text-lg font-semibold text-primary">
                {rating}
              </span>
              <span className="text-text-muted">
                based on {reviewCount} reviews
              </span>
            </div>

            <div className="space-y-6">
              {MOCK_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-border pb-6 last:border-b-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="font-display text-sm text-accent">
                          {review.name[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-body text-sm font-medium text-primary">
                          {review.name}
                        </p>
                        <p className="font-body text-xs text-text-muted">
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size={14} />
                  </div>
                  <p className="font-body text-sm text-text-secondary leading-relaxed mt-2">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </AccordionSection>
        </div>
      </div>

      {/* ── Related Products ─────────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section aria-label="Related Products" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl text-primary mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Recently Viewed ──────────────────────────────────────────────── */}
      <RecentlyViewed />

      {/* Sticky Mobile Add to Cart */}
      <AnimatePresence>
        {showStickyBar && product && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-border px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium text-primary truncate">{name}</p>
                <p className="font-mono text-base font-semibold text-primary">{formatPrice(price)}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={cn(
                  'px-6 py-3 rounded-lg font-medium text-sm flex items-center gap-2 transition-all',
                  inCart || addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-accent text-white hover:bg-accent-dark'
                )}
              >
                {inCart || addedToCart ? <><Check size={16} /> Added</> : <><ShoppingBag size={16} /> Add to Cart</>}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
