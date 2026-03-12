import { cn } from '../../utils/cn';

const variants = {
  light: 'bg-white/70 backdrop-blur-xl border border-white/30',
  dark: 'bg-black/30 backdrop-blur-xl border border-white/10',
  accent: 'bg-accent/10 backdrop-blur-xl border border-accent/20',
};

export default function GlassCard({ children, variant = 'light', hover = false, className, ...rest }) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        variants[variant],
        hover && 'hover:shadow-lg hover:scale-[1.02] hover:bg-white/80',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
