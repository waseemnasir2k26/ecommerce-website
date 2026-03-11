import { cn } from '../../utils/cn';

const brands = [
  'Forbes',
  'TechCrunch',
  'Vogue',
  'Wired',
  'GQ',
  'Bloomberg',
  'Fast Company',
  'Dezeen',
];

export default function BrandMarquee() {
  return (
    <section className="border-t border-b border-border py-8 overflow-hidden bg-bg">
      <p className="text-center font-mono uppercase tracking-widest text-text-muted text-xs mb-6">
        As Featured In
      </p>

      <div className="relative group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div
          className={cn(
            'flex items-center whitespace-nowrap',
            'animate-marquee group-hover:[animation-play-state:paused]'
          )}
        >
          {/* Original set */}
          {brands.map((brand) => (
            <span
              key={`a-${brand}`}
              className="text-2xl font-display text-text-muted/40 mx-12 select-none shrink-0"
            >
              {brand}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {brands.map((brand) => (
            <span
              key={`b-${brand}`}
              className="text-2xl font-display text-text-muted/40 mx-12 select-none shrink-0"
              aria-hidden="true"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
