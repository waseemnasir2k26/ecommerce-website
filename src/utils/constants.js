/** Site-wide constants */

export const SITE_NAME = 'LUXE';
export const SITE_TAGLINE = 'Curated Modern Living';
export const CURRENCY = 'USD';
export const FREE_SHIPPING_THRESHOLD = 75;
export const MAX_CART_QUANTITY = 10;
export const ITEMS_PER_PAGE = 12;
export const SEARCH_DEBOUNCE_MS = 300;

/** Navigation links */
export const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/** Social links */
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com',
  twitter: 'https://twitter.com',
  pinterest: 'https://pinterest.com',
};

/** Sort options for product listings */
export const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Selling', value: 'best-selling' },
];
