import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Truck, RotateCcw, Shield, Headphones } from 'lucide-react';
import { cn } from '../../utils/cn';

const features = [
  {
    icon: Truck,
    heading: 'Free Shipping Worldwide',
    description:
      'Complimentary shipping on every order, no minimum purchase required.',
  },
  {
    icon: RotateCcw,
    heading: '30-Day Returns',
    description:
      'Not the right fit? Return any item within 30 days for a full refund.',
  },
  {
    icon: Shield,
    heading: 'Secure Payment',
    description:
      'Your data is protected with 256-bit SSL encryption at checkout.',
  },
  {
    icon: Headphones,
    heading: '24/7 Support',
    description:
      'Our team is here around the clock to help with any questions.',
  },
];

const cellVariants = {
  hidden: { opacity: 0, y: 24 },
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

export default function BentoGrid() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={feature.heading}
                custom={index}
                variants={cellVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className={cn(
                  'p-6 lg:p-8 rounded-xl border border-border',
                  'hover:shadow-md transition-shadow duration-300',
                  isEven ? 'bg-bg-secondary' : 'bg-white'
                )}
              >
                <Icon className="w-10 h-10 text-accent mb-4" strokeWidth={1.5} />
                <h3 className="font-body font-semibold text-lg text-primary mb-2">
                  {feature.heading}
                </h3>
                <p className="text-text-secondary text-sm font-body leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
