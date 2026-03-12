import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 w-full py-20">
        <motion.div
          className="max-w-2xl"
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.p
            variants={slideUp}
            className="font-mono uppercase tracking-widest text-accent text-sm mb-6"
          >
            New Collection 2026
          </motion.p>

          <motion.h1
            variants={slideUp}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] mb-6"
          >
            Crafted for Those Who Appreciate the Difference
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="text-white/80 text-lg lg:text-xl font-body max-w-lg mb-10"
          >
            Discover our curated collection of premium products, designed with intention and built to last.
          </motion.p>

          <motion.div variants={slideUp} className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="bg-accent text-white px-8 py-4 rounded-lg font-body font-medium hover:bg-accent-dark transition-colors duration-300"
            >
              Shop Collection
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-body font-medium hover:bg-white hover:text-primary transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
      </motion.div>
    </section>
  );
}
