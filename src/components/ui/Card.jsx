import { cn } from '../../utils/cn';

export default function Card({ children, className, hover = false, ...rest }) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm border border-border overflow-hidden',
        hover && 'hover:shadow-md hover:scale-[1.02] transition-all duration-300',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
