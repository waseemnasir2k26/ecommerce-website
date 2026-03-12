import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function PromoBar() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background lifestyle image */}
      <img
        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-accent-dark/90" />

      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <h2 className="font-display text-2xl lg:text-4xl text-white">
            New Season Collection — Up to 40% Off
          </h2>

          <p className="text-white/80 max-w-lg font-body">
            Limited time offer. Don&apos;t miss out on our biggest sale of the
            year.
          </p>

          <Link
            to="/shop"
            className={cn(
              'inline-flex items-center gap-2',
              'bg-white text-primary px-8 py-3 rounded-lg font-semibold',
              'hover:bg-white/90 transition-colors'
            )}
          >
            Shop the Sale
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
