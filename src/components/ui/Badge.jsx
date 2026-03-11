import { cn } from '../../utils/cn';

const variants = {
  new: 'bg-primary text-white',
  sale: 'bg-error text-white',
  bestseller: 'bg-accent text-white',
  default: 'bg-bg-secondary text-text-secondary',
};

export default function Badge({
  variant = 'default',
  children,
  className,
}) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-3 py-1 text-xs font-mono uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
