import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '../../utils/cn';

const stats = [
  { value: 10000, suffix: '+', label: 'Happy Customers', decimals: 0, format: true },
  { value: 50, suffix: '+', label: 'Countries Shipped', decimals: 0, format: false },
  { value: 30, suffix: '', label: 'Day Returns', decimals: 0, format: false },
  { value: 4.9, suffix: '', label: 'Average Rating', decimals: 1, format: false },
];

function formatNumber(num) {
  return num.toLocaleString('en-US');
}

function AnimatedStat({ value, suffix, label, decimals, format }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const hasAnimated = useRef(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;

    // If user prefers reduced motion, show final value immediately
    if (prefersReducedMotion) {
      setDisplayValue(value);
      hasAnimated.current = true;
      return;
    }

    hasAnimated.current = true;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value, prefersReducedMotion]);

  const formattedValue =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : format
        ? formatNumber(Math.round(displayValue))
        : Math.round(displayValue).toString();

  return (
    <div ref={ref} className="text-center py-6">
      <span className="font-display text-4xl lg:text-5xl text-primary block">
        {formattedValue}
        {suffix}
      </span>
      <span className="text-text-secondary text-sm uppercase tracking-wider font-mono mt-2 block">
        {label}
      </span>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              decimals={stat.decimals}
              format={stat.format}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
