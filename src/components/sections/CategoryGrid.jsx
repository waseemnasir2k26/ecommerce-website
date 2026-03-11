import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../utils/cn';

const cellVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.1,
    },
  }),
};

export default function CategoryGrid({ categories = [] }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-3xl lg:text-4xl text-primary text-center mb-12">
          Shop by Category
        </h2>

        <div
          className={cn(
            'grid gap-4',
            'grid-cols-2',
            'lg:grid-cols-4 lg:grid-rows-2'
          )}
        >
          {categories.map((category, index) => {
            const isFeature = index === 0;

            return (
              <motion.div
                key={category.id}
                custom={index}
                variants={cellVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className={cn(
                  isFeature && 'lg:col-span-2 lg:row-span-2',
                  'relative overflow-hidden rounded-xl group'
                )}
              >
                <Link
                  to={`/shop/${category.id}`}
                  className="block w-full h-full"
                >
                  {/* Background placeholder */}
                  <div
                    className={cn(
                      'bg-bg-secondary w-full transition-transform duration-500 group-hover:scale-105',
                      isFeature
                        ? 'aspect-square lg:aspect-auto lg:h-full min-h-[240px]'
                        : 'aspect-square min-h-[160px]'
                    )}
                  >
                    {/* Category initial as placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={cn(
                          'font-display text-text-muted/20 select-none',
                          isFeature ? 'text-8xl lg:text-9xl' : 'text-6xl'
                        )}
                      >
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Text content */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3
                      className={cn(
                        'text-white font-display',
                        isFeature ? 'text-2xl lg:text-3xl' : 'text-xl'
                      )}
                    >
                      {category.name}
                    </h3>
                    <p className="text-white/70 text-sm font-mono mt-1">
                      {category.productCount}{' '}
                      {category.productCount === 1 ? 'product' : 'products'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
