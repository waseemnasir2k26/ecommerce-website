# LUXE — Premium E-Commerce Website

A modern, production-grade e-commerce frontend built with React.js, Vite, and Tailwind CSS. Features 2026-trend-aligned design with warm neutrals, bold editorial typography, scroll-triggered animations, and a fully responsive mobile-first layout.

## Tech Stack

- **React 18** with React Router v6
- **Vite** for blazing-fast dev & builds
- **Tailwind CSS 3** for utility-first styling
- **Framer Motion** for animations
- **Lucide React** for icons

## Features

- 3 Landing Pages (Home, About, Contact)
- Full e-commerce shell (Shop, Product Detail, Cart, Checkout, Account)
- Product filtering, search, and category navigation
- Shopping cart with add/remove/quantity management
- Multi-step checkout flow
- Customer account dashboard with order history
- Newsletter signup & FAQ accordion
- Responsive design (mobile-first)
- Scroll-triggered animations & micro-interactions
- Bento grid layouts, brand marquee, testimonials carousel

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ecommerce-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder, ready for static hosting.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, MobileMenu, AnnouncementBar
│   ├── ui/           # Button, Card, Badge, Input, Modal, Skeleton, Toast
│   ├── sections/     # HeroSection, FeaturedProducts, CategoryGrid, etc.
│   ├── product/      # ProductCard, ProductFilter, ProductSearch, etc.
│   ├── cart/         # CartDrawer, CartItem, CartSummary
│   └── account/      # LoginForm, RegisterForm, OrderHistory
├── pages/            # HomePage, ShopPage, ProductDetailPage, etc.
├── data/             # Mock products, categories, testimonials
├── context/          # CartContext, AuthContext
├── hooks/            # useCart, useSearch, useScrollAnimation, useMediaQuery
├── utils/            # cn, formatPrice, constants
└── styles/           # globals.css with design system
```

## Design System

- **Colors**: Warm charcoal primary, terracotta accent, cloud dancer neutrals
- **Typography**: DM Serif Display (headings), Outfit (body), JetBrains Mono (prices/badges)
- **Animations**: Fade-up reveals, staggered entries, marquee, shimmer loading

## Deployment

The build output is a static SPA that can be deployed to any static hosting:
- Netlify, Vercel, GitHub Pages
- WordPress-compatible hosting (serve from `dist/`)

## License

Private — Client project.
