import { cn } from '../../utils/cn';

export default function Input({ label, error, className, ...rest }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-body text-sm font-medium text-primary">
          {label}
        </label>
      )}
      <input
        className={cn(
          'font-body rounded-lg px-4 py-3 border bg-white text-primary placeholder:text-text-muted',
          'outline-none transition-all duration-200',
          error
            ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
            : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/20',
          className
        )}
        {...rest}
      />
      {error && (
        <p className="text-sm text-error font-body">{error}</p>
      )}
    </div>
  );
}
