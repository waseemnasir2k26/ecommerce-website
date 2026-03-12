import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { cn } from '../utils/cn';
import { lookbookSections, moodboardImages } from '../data/lookbook';
import { products } from '../data/products';
import { formatPrice } from '../utils/formatPrice';
import { setPageSEO } from '../utils/seo';

/* ════════════════════════════════════════════════════════════
   Helper — find a product by ID
   ════════════════════════════════════════════════════════════ */
function getProduct(id) {
  return products.find((p) => p.id === id);
}

/* ════════════════════════════════════════════════════════════
   Section component — Scrollytelling block
   ════════════════════════════════════════════════════════════ */
function ScrollytellingSection({ section, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const product = getProduct(section.productId);
  const sectionNumber = String(index + 1).padStart(2, '0');
  const isEven = index % 2 === 0;

  /* parallax on the background / image */
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  /* ── Dark theme: full-bleed bg image ── */
  if (section.theme === 'dark') {
    return (
      <section
        ref={parallaxRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background image with parallax */}
        <motion.div
          className="absolute inset-0 -top-[15%] -bottom-[15%]"
          style={{ y: imgY }}
        >
          <img
            src={section.image}
            alt={section.headline}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div
          ref={ref}
          className={cn(
            'relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12',
            isEven ? 'text-left' : 'text-right'
          )}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 block font-mono text-sm text-accent"
          >
            {sectionNumber}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, x: isEven ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 font-display text-4xl text-white lg:text-6xl"
          >
            {section.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className={cn(
              'mb-10 max-w-md text-lg text-white/70',
              !isEven && 'ml-auto'
            )}
          >
            {section.body}
          </motion.p>

          {/* Featured product mini-card */}
          {product && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className={cn(!isEven && 'flex justify-end')}
            >
              <Link
                to={`/product/${product.slug}`}
                className="group inline-flex items-center gap-4 rounded-xl bg-white/10 p-3 backdrop-blur-lg transition hover:bg-white/15"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-20 w-20 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="pr-4">
                  <p className="font-medium text-white">{product.name}</p>
                  <p className="text-sm text-white/60">
                    {formatPrice(product.price)}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-accent transition group-hover:gap-2">
                    Shop <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  /* ── Light theme: split layout ── */
  return (
    <section
      ref={parallaxRef}
      className="min-h-screen flex items-center bg-bg overflow-hidden"
    >
      <div
        className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2"
      >
        {/* Image side */}
        <div className={cn(
          "relative h-[60vh] lg:h-screen overflow-hidden",
          !isEven && "lg:order-2"
        )}>
          <motion.img
            src={section.image}
            alt={section.headline}
            className="h-full w-full object-cover"
            style={{ y: imgY }}
            loading="lazy"
          />
        </div>

        {/* Text side */}
        <div
          ref={ref}
          className={cn(
            'flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-0',
            !isEven && 'lg:order-1'
          )}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 block font-mono text-sm text-accent"
          >
            {sectionNumber}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, x: isEven ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 font-display text-4xl text-primary lg:text-6xl"
          >
            {section.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mb-10 max-w-md text-lg text-text-secondary"
          >
            {section.body}
          </motion.p>

          {/* Featured product mini-card */}
          {product && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link
                to={`/product/${product.slug}`}
                className="group inline-flex items-center gap-4 rounded-xl border border-border bg-white p-3 transition hover:border-border-hover hover:shadow-md"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-20 w-20 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="pr-4">
                  <p className="font-medium text-primary">{product.name}</p>
                  <p className="text-sm text-text-secondary">
                    {formatPrice(product.price)}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-accent transition group-hover:gap-2">
                    Shop <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   LookbookPage — Landing Page Variant 3
   ════════════════════════════════════════════════════════════ */
export default function LookbookPage() {
  /* SEO */
  useEffect(() => {
    setPageSEO({
      title: 'Lookbook — The Season 2026',
      description:
        'Explore our visual lookbook for the 2026 season. A cinematic journey through curated collections — activewear, essentials, outdoor gear, and home goods.',
      canonical: 'https://luxestore.com/lookbook',
    });
  }, []);

  /* Hero parallax */
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(heroScrollProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.7], [1, 0]);

  /* After Dark section in-view */
  const darkShowcaseRef = useRef(null);
  const darkShowcaseInView = useInView(darkShowcaseRef, {
    once: true,
    margin: '-10%',
  });

  /* Mood board in-view */
  const moodRef = useRef(null);
  const moodInView = useInView(moodRef, { once: true, margin: '-10%' });

  /* After Dark products */
  const afterDarkIds = ['prod_001', 'prod_012', 'prod_006'];
  const afterDarkProducts = afterDarkIds
    .map((id) => getProduct(id))
    .filter(Boolean);

  /* ──────────────── RENDER ──────────────── */
  return (
    <div className="overflow-x-hidden">
      {/* ═══════════════════════════════════════════
          1. CINEMATIC HERO
          ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 -top-[30%] -bottom-[30%]"
          style={{ y: heroImgY }}
        >
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80"
            alt="Lookbook hero — fashion editorial"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 font-mono text-sm uppercase tracking-[0.3em] text-white/50"
          >
            LOOKBOOK 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-display text-7xl text-white lg:text-9xl"
          >
            The Season
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-6 text-lg text-white/60"
          >
            A visual journey through our latest collection
          </motion.p>

          {/* Animated line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.9, ease: 'easeInOut' }}
            className="mt-8 h-px bg-accent"
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          2. SCROLLYTELLING SECTIONS
          ═══════════════════════════════════════════ */}
      {lookbookSections.map((section, idx) => (
        <ScrollytellingSection key={section.id} section={section} index={idx} />
      ))}

      {/* ═══════════════════════════════════════════
          3. DARK LUXE PRODUCT SHOWCASE
          ═══════════════════════════════════════════ */}
      <section className="bg-[#0A0A0A] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Heading */}
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl text-white"
            >
              After Dark
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-3 text-white/50"
            >
              Our darkest, most luxurious pieces
            </motion.p>
          </div>

          {/* Product cards */}
          <div
            ref={darkShowcaseRef}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {afterDarkProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={
                  darkShowcaseInView
                    ? { opacity: 1, scale: 1 }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: 'easeOut',
                }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <Link to={`/product/${product.slug}`}>
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="mb-1 text-lg font-medium text-white">
                      {product.name}
                    </h3>
                    <p className="mb-4 text-sm text-white/50">
                      {formatPrice(product.price)}
                    </p>
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. MOOD BOARD GRID
          ═══════════════════════════════════════════ */}
      <section className="bg-bg py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-2 text-center font-display text-3xl"
          >
            The Mood
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 text-center text-text-secondary"
          >
            Inspiration behind the collection
          </motion.p>

          <div
            ref={moodRef}
            className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
          >
            {moodboardImages.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={moodInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: 'easeOut',
                }}
                className={cn(
                  'cursor-pointer overflow-hidden rounded-xl',
                  idx % 2 === 0 ? 'aspect-square' : 'aspect-[3/4]'
                )}
              >
                <img
                  src={src}
                  alt={`Mood board image ${idx + 1}`}
                  className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center font-mono text-accent"
          >
            Follow @LUXE
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. FINAL CTA
          ═══════════════════════════════════════════ */}
      <section className="gradient-mesh py-32 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl lg:text-5xl"
          >
            Shop the Look
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 mb-10 text-text-secondary"
          >
            Every piece in this lookbook is available now
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link to="/shop">
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="btn-glow inline-block rounded-full bg-primary px-10 py-4 font-medium text-white transition"
              >
                Browse Collection
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
