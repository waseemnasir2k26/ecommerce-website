import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { formatPrice } from '../../utils/formatPrice';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';

export default function RecentlyViewed() {
  const { recentlyViewedIds } = useRecentlyViewed();

  const viewedProducts = recentlyViewedIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  if (viewedProducts.length === 0) return null;

  return (
    <section className="py-12 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-xl text-primary mb-6">
          Recently Viewed
        </h2>
        <div className="scroll-snap-x flex gap-4 pb-2">
          {viewedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="snap-item min-w-[180px] flex-shrink-0 group"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-white mb-2">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <p className="text-sm font-body text-primary group-hover:text-accent transition-colors line-clamp-1">
                {product.name}
              </p>
              <p className="text-sm font-mono text-text-secondary">
                {formatPrice(product.price)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
