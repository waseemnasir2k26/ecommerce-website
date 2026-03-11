import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.5 },
  },
};

export default function HeroSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-bg overflow-hidden"
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 w-full py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content — 60% */}
          <motion.div
            className="w-full lg:w-[60%] flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.p
              variants={slideUp}
              className="font-mono uppercase tracking-widest text-accent text-sm"
            >
              New Collection 2026
            </motion.p>

            <motion.h1
              variants={slideUp}
              className="font-display text-primary leading-[1.1]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Crafted for Those Who Appreciate the Difference
            </motion.h1>

            <motion.p
              variants={slideUp}
              className="font-body text-text-secondary text-lg max-w-xl"
            >
              Discover our curated collection of premium products, designed with
              intention and built to last.
            </motion.p>

            <motion.div
              variants={slideUp}
              className="flex flex-wrap items-center gap-4 mt-2"
            >
              <Link
                to="/shop"
                className="bg-primary text-white px-8 py-4 rounded-lg font-body font-medium hover:bg-primary-light transition-colors duration-300"
              >
                Shop Collection
              </Link>
              <Link
                to="/about"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-body font-medium hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side — 40% */}
          <motion.div
            className="w-full lg:w-[40%]"
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div
              className={cn(
                'aspect-[4/5] bg-bg-secondary rounded-2xl shadow-xl',
                'flex items-center justify-center',
                'rotate-2 hover:rotate-0 transition-transform duration-500 ease-out'
              )}
            >
              <span className="font-display text-text-muted/30 select-none" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)' }}>
                LUXE
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll-down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="font-mono text-xs text-text-muted tracking-wider uppercase">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-text-muted animate-bounce" />
      </motion.div>
    </section>
  );
}
