import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../utils/cn';
import ProductCard from '../product/ProductCard';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.08,
    },
  }),
};

export default function FeaturedProducts({ products = [] }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header row */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-3xl text-primary">Trending Now</h2>
          <Link
            to="/shop"
            className="text-accent hover:underline font-body font-medium transition-colors duration-200"
          >
            View All &rarr;
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
