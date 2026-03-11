import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gem, Leaf, Users } from 'lucide-react';
import { cn } from '../utils/cn';
import { setPageSEO } from '../utils/seo';
import NewsletterSignup from '../components/sections/NewsletterSignup';

const stats = [
  { value: '10,000+', label: 'Happy Customers' },
  { value: '50+', label: 'Countries Served' },
  { value: '100%', label: 'Sustainable Materials' },
  { value: '5', label: 'Years of Excellence' },
];

const milestones = [
  {
    year: '2021',
    title: 'The Beginning',
    description: 'Founded with a vision to redefine online shopping and bring premium quality to everyone.',
  },
  {
    year: '2022',
    title: 'First 1,000 Customers',
    description: 'Reached our first major milestone and proved that people crave thoughtfully crafted products.',
  },
  {
    year: '2023',
    title: 'Going Global',
    description: 'Expanded to 50+ countries, making LUXE accessible to customers around the world.',
  },
  {
    year: '2024',
    title: 'Sustainability Pledge',
    description: 'Committed to 100% sustainable packaging and carbon-neutral shipping across all orders.',
  },
  {
    year: '2025',
    title: '10K Strong',
    description: 'Built a thriving community of 10,000+ loyal customers who share our passion for quality.',
  },
];

const team = [
  { name: 'Alex Chen', role: 'Founder & CEO', initials: 'AC', color: 'bg-blue-100 text-blue-600' },
  { name: 'Maya Patel', role: 'Head of Design', initials: 'MP', color: 'bg-purple-100 text-purple-600' },
  { name: 'James Wilson', role: 'Head of Product', initials: 'JW', color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Sofia Rodriguez', role: 'Head of Marketing', initials: 'SR', color: 'bg-amber-100 text-amber-600' },
];

const values = [
  {
    icon: Gem,
    title: 'Quality',
    description:
      'Every product is meticulously crafted with premium materials and held to the highest standards before it reaches your hands.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description:
      'From sourcing to shipping, we prioritize eco-friendly practices to protect the planet for future generations.',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'We believe in building meaningful relationships with our customers, partners, and the communities we serve.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export default function AboutPage() {
  useEffect(() => {
    setPageSEO({
      title: 'About Us — Our Story',
      description: 'Learn about LUXE — built on quality, driven by purpose. Discover our mission, our journey, and the team behind the brand. 10,000+ happy customers worldwide.',
      canonical: 'https://luxestore.com/about',
    });
  }, []);

  return (
    <main>
      {/* ─── Hero ─── */}
      <section aria-label="About LUXE hero" className="min-h-[60vh] bg-bg-secondary flex items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center px-6"
        >
          <h1 className="font-display text-5xl lg:text-7xl text-primary mb-4">
            Our Story
          </h1>
          <p className="text-text-secondary text-xl font-body max-w-lg mx-auto">
            Built on quality. Driven by purpose.
          </p>
        </motion.div>
      </section>

      {/* ─── Mission Section ─── */}
      <section aria-label="Our Mission" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/5] bg-bg-secondary rounded-2xl"
            />

            {/* Right — Copy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } },
              }}
            >
              <motion.span
                variants={fadeUp}
                className="font-mono uppercase tracking-widest text-accent text-sm"
              >
                Our Mission
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="font-display text-3xl text-primary mt-4 mb-6"
              >
                We believe in creating products that stand the test of time
              </motion.h2>

              <motion.p variants={fadeUp} className="text-text-secondary font-body mb-4">
                At LUXE, quality is not a feature — it is the foundation. Every item
                in our collection is thoughtfully designed, ethically sourced, and
                built to last. We partner with artisans and manufacturers who share
                our uncompromising standards.
              </motion.p>

              <motion.p variants={fadeUp} className="text-text-secondary font-body mb-4">
                Sustainability drives every decision we make. From the raw materials
                we select to the packaging that arrives at your door, we strive to
                leave the lightest possible footprint while delivering an exceptional
                experience.
              </motion.p>

              <motion.p variants={fadeUp} className="text-text-secondary font-body mb-8">
                Our customers are at the heart of everything. We listen, learn, and
                evolve — because building a brand worth trusting means showing up
                with integrity, every single day.
              </motion.p>

              <motion.blockquote
                variants={fadeUp}
                className="border-l-4 border-accent pl-6 italic text-lg text-primary font-display"
              >
                "True luxury is not about excess — it is about intention, craft, and
                the quiet confidence that comes from owning something made right."
              </motion.blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats Row ─── */}
      <section aria-label="Company Statistics" className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="font-display text-4xl block">{stat.value}</span>
                <span className="text-sm text-white/70 font-mono uppercase tracking-wide mt-1 block">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Timeline / Journey ─── */}
      <section aria-label="Our Journey Timeline" className="py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl text-primary text-center mb-16"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

            {milestones.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className={cn(
                    'relative mb-12 last:mb-0',
                    'grid grid-cols-[1fr_auto_1fr] items-start gap-4'
                  )}
                >
                  {/* Left content or spacer */}
                  {isLeft ? (
                    <div className="text-right pr-4">
                      <span className="font-mono text-accent font-bold text-sm">
                        {milestone.year}
                      </span>
                      <h3 className="font-semibold text-primary mt-1">
                        {milestone.title}
                      </h3>
                      <p className="text-text-secondary text-sm mt-1 font-body">
                        {milestone.description}
                      </p>
                    </div>
                  ) : (
                    <div />
                  )}

                  {/* Dot */}
                  <div className="flex items-start justify-center pt-1">
                    <span className="w-3 h-3 bg-accent rounded-full relative z-10" />
                  </div>

                  {/* Right content or spacer */}
                  {!isLeft ? (
                    <div className="pl-4">
                      <span className="font-mono text-accent font-bold text-sm">
                        {milestone.year}
                      </span>
                      <h3 className="font-semibold text-primary mt-1">
                        {milestone.title}
                      </h3>
                      <p className="text-text-secondary text-sm mt-1 font-body">
                        {milestone.description}
                      </p>
                    </div>
                  ) : (
                    <div />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Team Section ─── */}
      <section aria-label="Our Team" className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl text-primary text-center mb-12"
          >
            The People Behind the Brand
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                {/* Avatar placeholder */}
                <div
                  className={cn(
                    'w-24 h-24 rounded-full mx-auto flex items-center justify-center',
                    'text-xl font-semibold',
                    member.color
                  )}
                >
                  {member.initials}
                </div>

                <h3 className="font-semibold text-primary mt-4">{member.name}</h3>
                <p className="text-text-secondary text-sm font-body">{member.role}</p>

                {/* Social links placeholder — visible on hover */}
                <div className="flex items-center justify-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-8 h-8 rounded-full bg-border inline-flex items-center justify-center text-text-muted text-xs cursor-pointer hover:bg-accent hover:text-white transition-colors">
                    in
                  </span>
                  <span className="w-8 h-8 rounded-full bg-border inline-flex items-center justify-center text-text-muted text-xs cursor-pointer hover:bg-accent hover:text-white transition-colors">
                    tw
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values Grid ─── */}
      <section aria-label="Our Values" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <value.icon
                  className="text-accent w-10 h-10 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="font-display text-xl text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-text-secondary font-body">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section aria-label="Call to Action" className="py-20 bg-primary text-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl mb-2">
              Ready to Experience the Difference?
            </h2>
            <p className="text-white/70 font-body mb-6">
              Discover our curated collection of premium essentials.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-accent text-white px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-opacity mt-6"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <NewsletterSignup />
    </main>
  );
}
