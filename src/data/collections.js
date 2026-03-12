import { products } from './products';

export const collections = [
  {
    id: "spring-essentials",
    title: "Spring Essentials",
    subtitle: "Light layers for warmer days",
    description: "Our curated edit of must-have pieces for the new season. From breezy oxford shirts to performance joggers that transition from trail to town.",
    heroImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80",
    accentColor: "#D4926E",
    productIds: ["prod_005", "prod_007", "prod_008", "prod_010", "prod_016"],
  },
  {
    id: "tech-forward",
    title: "Tech Forward",
    subtitle: "The future, delivered",
    description: "Premium electronics that blend seamlessly into your life. From studio-quality headphones to smart home ecosystems that anticipate your needs.",
    heroImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80",
    accentColor: "#1A1A1A",
    productIds: ["prod_001", "prod_002", "prod_003", "prod_004"],
  },
  {
    id: "home-sanctuary",
    title: "Home Sanctuary",
    subtitle: "Where comfort meets craft",
    description: "Transform your space with artisan-crafted pieces designed to make every corner of your home feel intentional and inviting.",
    heroImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1400&q=80",
    accentColor: "#A85D35",
    productIds: ["prod_013", "prod_014", "prod_015", "prod_016"],
  },
];

export function getCollectionProducts(collection) {
  return collection.productIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);
}
