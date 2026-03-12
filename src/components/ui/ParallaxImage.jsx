import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function ParallaxImage({ src, alt, speed = 0.3, className, imgClassName }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  return (
    <div ref={ref} className={cn('overflow-hidden relative', className)}>
      <motion.img
        src={src}
        alt={alt || ''}
        style={{ y }}
        className={cn('w-full h-[120%] object-cover absolute top-[-10%]', imgClassName)}
        loading="lazy"
      />
    </div>
  );
}
