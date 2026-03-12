import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { cn } from '../utils/cn';
import { collections, getCollectionProducts } from '../data/collections';
import { products } from '../data/products';
import { formatPrice } from '../utils/formatPrice';
import ProductCard from '../components/product/ProductCard';
import NewsletterSignup from '../components/sections/NewsletterSignup';
import { setPageSEO } from '../utils/seo';

/* ─────────────────────────────────────────────
   Reusable scroll-triggered section wrapper
   ───────────────────────────────────────────── */
function RevealSection({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Collection category map for shop links
   ───────────────────────────────────────────── */
const collectionCategoryMap = {
  'spring-essentials': 'clothing',
  'tech-forward': 'electronics',
  'home-sanctuary': 'home',
};

/* ═════════════════════════════════════════════
   COLLECTIONS PAGE — Landing Variant 2
   Editorial-style curated collections
   ═════════════════════════════════════════════ */
export default function CollectionsPage() {
  const heroRef = useRef(null);
  const editorialImageRef = useRef(null);
  const scrollStripRef = useRef(null);

  // Parallax — hero
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  // Parallax — editorial split image
  const { scrollYProgress: editorialProgress } = useScroll({
    target: editorialImageRef,
    offset: ['start end', 'end start'],
  });
  const editorialY = useTransform(editorialProgress, [0, 1], ['-10%', '10%']);

  // SEO
  useEffect(() => {
    setPageSEO({
      title: 'Collections — The Edit',
      description:
        'Explore our curated collections. Hand-picked edits of premium electronics, clothing, accessories & home goods for the discerning shopper.',
    });
  }, []);

  // Horizontal scroll navigation
  const scrollStrip = (direction) => {
    if (!scrollStripRef.current) return;
    const amount = 320;
    scrollStripRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  // Editor's picks — first 8 products
  const editorsPicks = products.slice(0, 8);
  // Trending — first 8 products (shuffled perception via slice)
  const trending = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);

  return (
    <main className="overflow-hidden">
      {/* ════════════════════════════════════════
          1. HERO — Full viewport, dramatic parallax
          ════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80"
            alt="Editorial fashion collection"
            className="w-full h-[120%] object-cover"
          />
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono uppercase tracking-[0.3em] text-white/50 text-sm mb-6"
          >
            Spring / Summer 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl lg:text-8xl text-white mb-6 leading-[0.9]"
          >
            The Edit
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/70 text-xl font-body max-w-md mx-auto"
          >
            Curated collections for the discerning
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-white/40 text-xs font-mono uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          2. COLLECTIONS GRID — Asymmetric bento
          ════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6">
        <RevealSection>
          <p className="font-mono uppercase tracking-[0.2em] text-text-muted text-sm mb-3 text-center">
            Curated for you
          </p>
          <h2 className="font-display text-3xl lg:text-5xl text-primary text-center mb-16">
            The Collections
          </h2>
        </RevealSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => {
            const isFirst = index === 0;
            const categorySlug = collectionCategoryMap[collection.id] || 'clothing';

            return (
              <RevealSection
                key={collection.id}
                delay={index * 0.15}
                className={cn(
                  isFirst && 'lg:col-span-2 lg:row-span-2'
                )}
              >
                <Link
                  to={`/shop?category=${categorySlug}`}
                  className={cn(
                    'group relative block overflow-hidden rounded-2xl',
                    isFirst ? 'min-h-[400px] lg:min-h-[600px]' : 'min-h-[300px] lg:min-h-[500px]',
                    'w-full h-full'
                  )}
                >
                  {/* Background image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={collection.heroImage}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-colors duration-500 group-hover:from-black/80" />

                  {/* Glass content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-6 lg:p-8">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 transition-all duration-500 group-hover:bg-white/20">
                      <p className="font-mono uppercase tracking-widest text-white/50 text-xs mb-2">
                        {collection.subtitle}
                      </p>
                      <h3 className={cn(
                        'font-display text-white mb-3',
                        isFirst ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'
                      )}>
                        {collection.title}
                      </h3>
                      {isFirst && (
                        <p className="text-white/60 font-body text-sm lg:text-base mb-4 max-w-md">
                          {collection.description}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-2 text-white font-medium text-sm group/link">
                        Shop Collection
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealSection>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. HORIZONTAL PRODUCT STRIP — Editor's Picks
          ════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl text-gradient mb-2">
                  Editor's Picks
                </h2>
                <p className="text-text-secondary font-body">
                  Hand-selected favorites from our team
                </p>
              </div>

              {/* Desktop nav arrows */}
              <div className="hidden lg:flex items-center gap-3">
                <button
                  onClick={() => scrollStrip('left')}
                  className="w-10 h-10 rounded-full border border-border hover:border-accent hover:text-accent flex items-center justify-center transition-colors"
                  aria-label="Scroll left"
                >
                  <ArrowRight size={18} className="rotate-180" />
                </button>
                <button
                  onClick={() => scrollStrip('right')}
                  className="w-10 h-10 rounded-full border border-border hover:border-accent hover:text-accent flex items-center justify-center transition-colors"
                  aria-label="Scroll right"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </RevealSection>

          {/* Horizontal scroll strip */}
          <div
            ref={scrollStripRef}
            className="scroll-snap-x flex gap-6 pb-4"
          >
            {editorsPicks.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="min-w-[280px] snap-item flex-shrink-0"
              >
                <Link to={`/product/${product.slug}`} className="group block">
                  {/* Image */}
                  <div className="aspect-square rounded-xl overflow-hidden bg-white mb-3 relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.badge && (
                      <span className={cn(
                        'absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-mono font-medium',
                        product.badge === 'Sale' && 'bg-error text-white',
                        product.badge === 'New' && 'bg-accent text-white',
                        product.badge === 'Bestseller' && 'bg-primary text-white'
                      )}>
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <p className="text-xs text-text-muted uppercase tracking-wider font-mono mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-sm font-medium text-primary group-hover:text-accent transition-colors line-clamp-1 mb-1.5">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={cn(
                            i < Math.round(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-gray-200 text-gray-200'
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-text-muted font-mono">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-primary text-sm">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="font-mono text-xs text-text-muted line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. SPLIT EDITORIAL — 50/50 layout
          ════════════════════════════════════════ */}
      <section className="py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
          {/* Left — Image with parallax (on mobile renders second) */}
          <div
            ref={editorialImageRef}
            className="relative overflow-hidden order-2 lg:order-1 min-h-[400px] lg:min-h-0"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
              alt="LUXE quality lifestyle"
              className="absolute inset-0 w-full h-[120%] object-cover"
              style={{ y: editorialY }}
              loading="lazy"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          </div>

          {/* Right — Text content */}
          <div className="flex items-center order-1 lg:order-2 bg-bg px-8 lg:px-16 xl:px-24 py-16 lg:py-0">
            <RevealSection className="max-w-lg">
              <p className="font-mono uppercase tracking-[0.2em] text-accent text-sm mb-4">
                Why Luxe
              </p>

              <h2 className="font-display text-3xl lg:text-5xl text-primary mb-6 leading-tight">
                Quality That Speaks for Itself
              </h2>

              <p className="text-text-secondary font-body text-base lg:text-lg leading-relaxed mb-8">
                Every product in our collection is chosen with intention. We partner with
                artisans and brands who share our commitment to exceptional materials,
                ethical production, and designs that transcend seasonal trends. This isn't
                fast fashion or disposable tech — it's an investment in things that last,
                that feel right, that tell a story worth sharing.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-accent font-medium underline-grow"
              >
                Our Story
                <ArrowRight size={16} />
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5. DARK QUOTE SECTION — Full-width dramatic
          ════════════════════════════════════════ */}
      <section className="relative bg-primary py-24 lg:py-32 overflow-hidden noise-texture">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <RevealSection>
            {/* Accent line */}
            <div className="w-16 h-px bg-accent mx-auto mb-10" />

            <blockquote>
              <p className="font-display text-3xl lg:text-5xl text-white italic leading-snug mb-8">
                "We don't follow trends — we set the standard for what's next."
              </p>

              <footer className="text-white/50 font-mono text-sm tracking-wider">
                — The LUXE Team
              </footer>
            </blockquote>
          </RevealSection>
        </div>
      </section>

      {/* ════════════════════════════════════════
          6. FEATURED PRODUCTS GRID — Trending
          ════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6">
        <RevealSection>
          <p className="font-mono uppercase tracking-[0.2em] text-text-muted text-sm mb-3 text-center">
            What everyone's loving
          </p>
          <h2 className="font-display text-3xl lg:text-5xl text-primary text-center mb-14">
            Trending This Season
          </h2>
        </RevealSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((product, index) => (
            <RevealSection key={product.id} delay={index * 0.08}>
              <ProductCard product={product} />
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={0.3}>
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-accent font-medium text-lg underline-grow"
            >
              Shop All
              <ArrowRight size={18} />
            </Link>
          </div>
        </RevealSection>
      </section>

      {/* ════════════════════════════════════════
          7. NEWSLETTER — Reuse component
          ════════════════════════════════════════ */}
      <NewsletterSignup />
    </main>
  );
}
