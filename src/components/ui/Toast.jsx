import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { cn } from '../../utils/cn';

const config = {
  success: {
    borderColor: 'border-l-success',
    Icon: CheckCircle,
    iconColor: 'text-success',
  },
  error: {
    borderColor: 'border-l-error',
    Icon: XCircle,
    iconColor: 'text-error',
  },
  info: {
    borderColor: 'border-l-accent',
    Icon: Info,
    iconColor: 'text-accent',
  },
};

export default function Toast({
  message,
  type = 'info',
  isVisible,
  onClose,
}) {
  const { borderColor, Icon, iconColor } = config[type] || config.info;

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-6 left-1/2 z-[100] -translate-x-1/2"
          initial={{ opacity: 0, y: -40, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -40, x: '-50%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div
            className={cn(
              'flex items-center gap-3 bg-white rounded-lg shadow-lg border border-border px-5 py-3 border-l-4 min-w-[300px]',
              borderColor
            )}
          >
            <Icon size={20} className={cn('shrink-0', iconColor)} />
            <p className="font-body text-sm text-primary">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
