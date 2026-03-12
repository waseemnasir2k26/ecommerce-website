import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function TestimonialsCarousel({ testimonials = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // On desktop we show 3 at a time, on mobile 1
  // We calculate pages based on groups of 3
  const desktopPageCount = Math.ceil(testimonials.length / 3);
  const mobilePageCount = testimonials.length;

  const goToSlide = useCallback(
    (index, dir) => {
      setDirection(dir !== undefined ? dir : index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % mobilePageCount);
  }, [mobilePageCount]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + mobilePageCount) % mobilePageCount);
  }, [mobilePageCount]);

  // Auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  // Get the desktop page index for the current active index
  const desktopPage = Math.floor(activeIndex / 3);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={18}
        className={cn(
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        )}
      />
    ));
  };

  const TestimonialCard = ({ testimonial }) => (
    <div className="bg-white rounded-2xl p-8 border border-border h-full flex flex-col">
      <div className="flex gap-1 mb-4">{renderStars(testimonial.rating)}</div>
      <p className="font-body text-lg italic text-text-secondary flex-1 mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
            loading="lazy"
          />
        )}
        <div>
          <p className="font-semibold text-primary">{testimonial.name}</p>
          <p className="text-sm text-text-muted">{testimonial.location}</p>
          {testimonial.product && (
            <p className="text-xs text-accent font-mono mt-0.5">
              Purchased: {testimonial.product}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-3xl text-primary text-center mb-16">
          What Our Customers Say
        </h2>

        {testimonials.length === 0 ? (
          <p className="text-center text-text-muted font-body">No reviews yet</p>
        ) : (
          <>
            <div className="relative">
              {/* Prev / Next Arrows */}
              <button
                onClick={goPrev}
                className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-accent transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={goNext}
                className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-accent transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>

              {/* Mobile: single testimonial */}
              <div className="block lg:hidden overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    <TestimonialCard testimonial={testimonials[activeIndex]} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Desktop: three testimonials */}
              <div className="hidden lg:block overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={desktopPage}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="grid grid-cols-3 gap-6"
                  >
                    {testimonials
                      .slice(desktopPage * 3, desktopPage * 3 + 3)
                      .map((testimonial) => (
                        <TestimonialCard
                          key={testimonial.id}
                          testimonial={testimonial}
                        />
                      ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dot navigation */}
            <div className="flex justify-center gap-2 mt-10">
              {/* Mobile dots — one per testimonial */}
              <div className="flex gap-2 lg:hidden">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-colors',
                      i === activeIndex ? 'bg-accent' : 'bg-border'
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              {/* Desktop dots — one per page of 3 */}
              <div className="hidden lg:flex gap-2">
                {Array.from({ length: desktopPageCount }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i * 3)}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-colors',
                      i === desktopPage ? 'bg-accent' : 'bg-border'
                    )}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
