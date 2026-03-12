import { Truck, RotateCcw, Shield, Headphones } from 'lucide-react';
import { cn } from '../../utils/cn';

const valueProps = [
  { icon: Truck, label: 'Free Shipping Over $75' },
  { icon: RotateCcw, label: 'Easy 30-Day Returns' },
  { icon: Shield, label: 'Secure Checkout' },
  { icon: Headphones, label: '24/7 Customer Support' },
];

export default function BrandMarquee() {
  return (
    <section className="border-t border-b border-border py-6 overflow-hidden bg-bg">
      {/* Desktop: static grid showing all 4 side by side */}
      <div className="hidden md:flex items-center justify-center gap-12 lg:gap-16 max-w-5xl mx-auto px-6">
        {valueProps.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-accent shrink-0" strokeWidth={1.5} />
            <span className="text-sm font-body text-text-secondary whitespace-nowrap">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile: marquee auto-scroll */}
      <div className="md:hidden relative group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div
          className={cn(
            'flex items-center whitespace-nowrap',
            'animate-marquee'
          )}
        >
          {/* Original set */}
          {valueProps.map(({ icon: Icon, label }) => (
            <div key={`a-${label}`} className="flex items-center gap-2 mx-8 shrink-0">
              <Icon className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-body text-text-secondary">
                {label}
              </span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {valueProps.map(({ icon: Icon, label }) => (
            <div key={`b-${label}`} className="flex items-center gap-2 mx-8 shrink-0" aria-hidden="true">
              <Icon className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-body text-text-secondary">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
