import { Truck, Lock, RefreshCw, Award } from 'lucide-react';
import { cn } from '../../utils/cn';

const badges = [
  { icon: Truck, label: 'Free Shipping' },
  { icon: Lock, label: 'Secure Checkout' },
  { icon: RefreshCw, label: 'Money Back Guarantee' },
  { icon: Award, label: 'Premium Quality' },
];

export default function TrustBadges() {
  return (
    <section className="bg-bg-secondary py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex overflow-x-auto scrollbar-hide">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className={cn(
                  'flex items-center gap-2 px-6 py-2 whitespace-nowrap flex-shrink-0',
                  'lg:flex-1 lg:justify-center',
                  index < badges.length - 1 && 'border-r border-border'
                )}
              >
                <Icon size={18} className="text-accent" strokeWidth={1.5} />
                <span className="text-sm text-text-secondary font-body">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
