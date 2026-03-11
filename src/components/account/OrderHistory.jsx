import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatPrice } from '../../utils/formatPrice';

const MOCK_ORDERS = [
  {
    id: 'ORD-2024-1847',
    date: '2024-12-15',
    status: 'Delivered',
    total: 189.97,
    itemsCount: 3,
    items: [
      { name: 'Merino Wool Sweater', quantity: 1, price: 89.99 },
      { name: 'Leather Belt', quantity: 1, price: 49.99 },
      { name: 'Cotton Tee - White', quantity: 1, price: 29.99 },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
    trackingNumber: '1Z999AA10123456784',
  },
  {
    id: 'ORD-2024-1923',
    date: '2025-01-08',
    status: 'Shipped',
    total: 124.5,
    itemsCount: 2,
    items: [
      { name: 'Cashmere Scarf', quantity: 1, price: 74.5 },
      { name: 'Silk Pocket Square', quantity: 2, price: 25.0 },
    ],
    shippingAddress: '456 Oak Ave, Brooklyn, NY 11201',
    trackingNumber: '1Z999BB20234567891',
  },
  {
    id: 'ORD-2025-0042',
    date: '2025-02-22',
    status: 'Processing',
    total: 259.0,
    itemsCount: 1,
    items: [
      { name: 'Italian Leather Jacket', quantity: 1, price: 259.0 },
    ],
    shippingAddress: '789 Pine St, Manhattan, NY 10013',
    trackingNumber: null,
  },
  {
    id: 'ORD-2025-0098',
    date: '2025-03-05',
    status: 'Delivered',
    total: 67.98,
    itemsCount: 2,
    items: [
      { name: 'Organic Cotton Socks (3-pack)', quantity: 1, price: 18.99 },
      { name: 'Linen Blend Shirt', quantity: 1, price: 48.99 },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
    trackingNumber: '1Z999CC30345678902',
  },
];

const STATUS_CONFIG = {
  Delivered: {
    color: 'bg-green-100 text-green-700',
    icon: CheckCircle2,
  },
  Shipped: {
    color: 'bg-blue-100 text-blue-700',
    icon: Truck,
  },
  Processing: {
    color: 'bg-yellow-100 text-yellow-700',
    icon: Clock,
  },
};

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Processing;
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider',
        config.color
      )}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

function OrderRow({ order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      {/* Summary row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 hover:bg-bg-secondary/50 transition-colors"
      >
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-[1fr_1fr_auto_1fr_auto_auto] md:items-center md:gap-4">
          <span className="font-mono text-sm font-medium text-primary">
            {order.id}
          </span>
          <span className="font-body text-sm text-text-secondary">
            {new Date(order.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <StatusBadge status={order.status} />
          <span className="font-body text-sm text-text-secondary">
            {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}
          </span>
          <span className="font-mono text-sm font-semibold text-primary">
            {formatPrice(order.total)}
          </span>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={18} className="text-text-muted" />
          </motion.div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm font-medium text-primary">
              {order.id}
            </span>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-text-muted" />
            </motion.div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-text-secondary">
              {new Date(order.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <StatusBadge status={order.status} />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-text-secondary">
              {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}
            </span>
            <span className="font-mono text-sm font-semibold text-primary">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-4 border-t border-border bg-bg-secondary/30 space-y-4">
              {/* Items */}
              <div>
                <h4 className="font-body text-xs font-medium uppercase tracking-wider text-text-muted mb-3">
                  Items
                </h4>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-bg-secondary flex items-center justify-center">
                          <Package size={14} className="text-text-muted" />
                        </div>
                        <span className="font-body text-sm text-primary">
                          {item.name}
                          {item.quantity > 1 && (
                            <span className="text-text-muted">
                              {' '}
                              x{item.quantity}
                            </span>
                          )}
                        </span>
                      </div>
                      <span className="font-mono text-sm text-text-secondary">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Tracking */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <h4 className="font-body text-xs font-medium uppercase tracking-wider text-text-muted mb-1.5">
                    Shipping Address
                  </h4>
                  <p className="font-body text-sm text-text-secondary">
                    {order.shippingAddress}
                  </p>
                </div>
                <div>
                  <h4 className="font-body text-xs font-medium uppercase tracking-wider text-text-muted mb-1.5">
                    Tracking Number
                  </h4>
                  <p className="font-mono text-sm text-text-secondary">
                    {order.trackingNumber || 'Not available yet'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OrderHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-primary">
          Order History
        </h2>
        <span className="font-body text-sm text-text-muted">
          {MOCK_ORDERS.length} orders
        </span>
      </div>

      {/* Desktop table header */}
      <div className="hidden md:grid md:grid-cols-[1fr_1fr_auto_1fr_auto_auto] md:gap-4 md:px-5 md:pb-2">
        <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
          Order
        </span>
        <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
          Date
        </span>
        <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
          Status
        </span>
        <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
          Items
        </span>
        <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
          Total
        </span>
        {/* Spacer for chevron */}
        <span className="w-[18px]" />
      </div>

      {/* Order rows */}
      <div className="space-y-3">
        {MOCK_ORDERS.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </div>

      {/* Empty state fallback (shown if no orders) */}
      {MOCK_ORDERS.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-bg-secondary flex items-center justify-center mx-auto mb-4">
            <Package size={32} className="text-text-muted" />
          </div>
          <h3 className="font-display text-lg font-semibold text-primary mb-2">
            No orders yet
          </h3>
          <p className="font-body text-sm text-text-secondary">
            Once you place an order, it will appear here.
          </p>
        </div>
      )}
    </motion.div>
  );
}
