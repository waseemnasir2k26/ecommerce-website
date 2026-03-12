import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
        alt="LUXE premium collection"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Gradient Overlay — stronger for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Pill Badge — top right */}
      <motion.div
        className="absolute top-28 right-6 sm:top-32 sm:right-10 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ delay: 1.4, duration: 0.6, ease: 'easeOut' }}
      >
        <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-full">
          Free Shipping Over $75
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 w-full py-20">
        <motion.div
          className="max-w-2xl"
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Season Badge */}
          <motion.p
            variants={slideUp}
            className="font-mono uppercase tracking-[0.25em] text-accent text-xs sm:text-sm mb-8"
          >
            Spring / Summer 2026
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={slideUp}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] mb-6"
          >
            Elevate Your
            <br />
            Everyday
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={slideUp}
            className="text-white/70 text-lg lg:text-xl font-body max-w-lg mb-10"
          >
            Discover our curated collection of premium products, designed with intention and built to last.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={slideUp} className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-body font-medium text-lg hover:bg-accent-dark transition-all duration-300 shadow-lg shadow-accent/20"
            >
              Shop New Arrivals
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/lookbook"
              className="border-2 border-white/40 text-white px-8 py-4 rounded-full font-body font-medium hover:bg-white hover:text-primary transition-all duration-300"
            >
              View Lookbook
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.p
            variants={fadeIn}
            className="text-white/50 text-sm font-body tracking-wide"
          >
            &#9733; 4.9/5 from 10,000+ customers
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
      </motion.div>
    </section>
  );
}
