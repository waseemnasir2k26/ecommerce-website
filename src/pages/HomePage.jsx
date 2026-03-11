import { useEffect } from 'react';
import { setPageSEO } from '../utils/seo';
import HeroSection from '../components/sections/HeroSection';
import BrandMarquee from '../components/sections/BrandMarquee';
import CategoryGrid from '../components/sections/CategoryGrid';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import BentoGrid from '../components/sections/BentoGrid';
import TestimonialsCarousel from '../components/sections/TestimonialsCarousel';
import PromoBar from '../components/sections/PromoBar';
import NewsletterSignup from '../components/sections/NewsletterSignup';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { testimonials } from '../data/testimonials';

export default function HomePage() {
  useEffect(() => {
    setPageSEO({
      title: null,
      description: 'Shop premium electronics, clothing, accessories, home goods & sports gear. Free shipping over $75. 30-day returns. Discover curated products crafted for those who appreciate the difference.',
      canonical: 'https://luxestore.com/',
    });
  }, []);

  return (
    <main>
      <HeroSection />
      <BrandMarquee />
      <section aria-label="Shop by Category">
        <CategoryGrid categories={categories} />
      </section>
      <section aria-label="Featured Products">
        <FeaturedProducts products={products.slice(0, 8)} />
      </section>
      <BentoGrid />
      <section aria-label="Customer Testimonials">
        <TestimonialsCarousel testimonials={testimonials} />
      </section>
      <PromoBar />
      <section aria-label="Newsletter Signup">
        <NewsletterSignup />
      </section>
    </main>
  );
}
