import { cn } from '../../utils/cn';

const variantClasses = {
  text: 'h-4 w-full rounded',
  circle: 'rounded-full',
  rect: 'rounded-xl',
};

export default function Skeleton({ className, variant = 'text' }) {
  return (
    <div
      className={cn(
        'bg-bg-secondary relative overflow-hidden',
        variantClasses[variant],
        className
      )}
    >
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
}
