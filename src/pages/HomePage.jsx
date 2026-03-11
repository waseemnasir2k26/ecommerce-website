import { useEffect } from 'react';
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
    document.title = 'LUXE — Premium E-Commerce';
  }, []);

  return (
    <main>
      <HeroSection />
      <BrandMarquee />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={products.slice(0, 8)} />
      <BentoGrid />
      <TestimonialsCarousel testimonials={testimonials} />
      <PromoBar />
      <NewsletterSignup />
    </main>
  );
}
