export const mainNav = [
  { name: "Home", path: "/" },
  {
    name: "Shop",
    path: "/shop",
    children: [
      { name: "All Products", path: "/shop", image: null },
      { name: "Electronics", path: "/shop/electronics", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&q=80" },
      { name: "Clothing", path: "/shop/clothing", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80" },
      { name: "Accessories", path: "/shop/accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80" },
      { name: "Home & Garden", path: "/shop/home", image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&q=80" },
      { name: "Sports & Outdoors", path: "/shop/sports", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80" },
    ],
    featured: {
      title: "New Season Collection",
      description: "Up to 40% off select styles",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
      path: "/collections",
    },
  },
  { name: "Collections", path: "/collections" },
  { name: "Lookbook", path: "/lookbook" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const footerNav = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "#" },
    { name: "Press", path: "#" },
  ],
  shop: [
    { name: "All Products", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "Lookbook", path: "/lookbook" },
    { name: "New Arrivals", path: "/shop" },
    { name: "Sale", path: "/shop" },
  ],
  support: [
    { name: "Contact Us", path: "/contact" },
    { name: "FAQ", path: "/contact" },
    { name: "Shipping & Returns", path: "#" },
    { name: "Privacy Policy", path: "#" },
    { name: "Terms of Service", path: "#" },
  ],
};

export const socialLinks = [
  { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
  { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
  { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
  { name: "Pinterest", url: "https://pinterest.com", icon: "pinterest" },
];
