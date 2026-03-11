import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ChevronDown, CheckCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import { setPageSEO } from '../utils/seo';
import NewsletterSignup from '../components/sections/NewsletterSignup';

const contactCards = [
  {
    icon: Mail,
    title: 'Email Us',
    detail: 'hello@luxestore.com',
    note: 'Usually responds in 2 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    detail: '+1 (555) 123-4567',
    note: 'Mon-Fri, 9am-6pm EST',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    detail: '123 Commerce St, New York, NY 10001',
    note: 'By appointment only',
  },
];

const subjectOptions = [
  'General Inquiry',
  'Order Support',
  'Returns & Refunds',
  'Partnership',
  'Other',
];

const faqs = [
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 5-7 business days within the continental US. Express shipping (2-3 business days) and overnight options are also available at checkout. International orders typically arrive within 10-14 business days depending on the destination.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day hassle-free return policy. If you are not completely satisfied with your purchase, simply initiate a return through your account dashboard. Items must be unused and in their original packaging. We will provide a prepaid return label and process your refund within 5 business days of receiving the item.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes! We ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination. All duties and taxes are calculated at checkout so there are no surprises when your order arrives.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order has shipped, you will receive a tracking number via email. You can also track your order in real time by logging into your account and visiting the Orders section. We partner with major carriers to ensure reliable delivery.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secured with industry-standard encryption.',
  },
  {
    question: 'How do I contact customer support?',
    answer:
      'You can reach us via email at hello@luxestore.com, by phone at +1 (555) 123-4567 during business hours, or through the contact form above. Our support team typically responds within 2 hours during business days.',
  },
  {
    question: 'Do you offer gift wrapping?',
    answer:
      'Yes, we offer premium gift wrapping for a small additional fee. You can select the gift wrap option at checkout and include a personalized message. Our packaging is eco-friendly and designed to make a lasting impression.',
  },
  {
    question: 'Can I modify or cancel my order?',
    answer:
      'Orders can be modified or cancelled within 1 hour of placement. After that window, our fulfillment team begins processing and we may not be able to make changes. Please contact support as soon as possible if you need assistance.',
  },
];

const initialFormData = { name: '', email: '', subject: '', message: '' };

export default function ContactPage() {
  useEffect(() => {
    setPageSEO({
      title: 'Contact Us',
      description: 'Get in touch with LUXE. Email, phone, or visit us. We typically respond within 2 hours. Find answers to FAQs about shipping, returns, and more.',
      canonical: 'https://luxestore.com/contact',
    });
  }, []);

  // ─── Form state ───
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // ─── FAQ state ───
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <main>
      {/* ─── Hero ─── */}
      <section aria-label="Contact page hero" className="py-20 lg:py-32 text-center bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl text-primary mb-4">
              Get in Touch
            </h1>
            <p className="text-text-secondary text-xl font-body max-w-lg mx-auto">
              We're here to help. Reach out anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact Grid ─── */}
      <section aria-label="Contact Information" className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-border text-center"
              >
                <card.icon
                  className="mx-auto w-10 h-10 text-accent mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="font-semibold text-primary mb-1">{card.title}</h3>
                <p className="text-text-secondary font-body text-sm">
                  {card.detail}
                </p>
                <p className="text-sm text-text-muted mt-1 font-body">{card.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact Form ─── */}
      <section aria-label="Contact Form" className="py-20">
        <div className="max-w-2xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl text-primary mb-8"
          >
            Send Us a Message
          </motion.h2>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    aria-label="Your Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-3 border border-border rounded-lg',
                      'focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none',
                      'font-body text-primary placeholder:text-text-muted'
                    )}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    aria-label="Your Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-3 border border-border rounded-lg',
                      'focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none',
                      'font-body text-primary placeholder:text-text-muted'
                    )}
                  />
                </div>

                {/* Subject */}
                <select
                  name="subject"
                  required
                  aria-label="Select a subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={cn(
                    'w-full px-4 py-3 border border-border rounded-lg',
                    'focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none',
                    'font-body text-primary',
                    !formData.subject && 'text-text-muted'
                  )}
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {/* Message */}
                <textarea
                  name="message"
                  placeholder="Your Message"
                  aria-label="Your Message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={cn(
                    'w-full px-4 py-3 border border-border rounded-lg min-h-[150px] resize-y',
                    'focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none',
                    'font-body text-primary placeholder:text-text-muted'
                  )}
                />

                {/* Submit */}
                <button
                  type="submit"
                  className={cn(
                    'bg-primary text-white w-full py-3 rounded-lg mt-2',
                    'font-medium hover:opacity-90 transition-opacity'
                  )}
                >
                  Send Message
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-12"
              >
                <CheckCircle
                  className="mx-auto text-green-600 mb-4"
                  size={48}
                  strokeWidth={1.5}
                />
                <h3 className="font-display text-2xl text-primary mb-2">
                  Message Sent!
                </h3>
                <p className="text-text-secondary font-body">
                  Thank you for reaching out. We will get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setFormData(initialFormData);
                    setSubmitted(false);
                  }}
                  className="mt-6 text-accent font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── FAQ Accordion ─── */}
      <section aria-label="Frequently Asked Questions" className="py-20 bg-bg-secondary">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl text-primary text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>

          <div>
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="border-b border-border">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="py-4 w-full text-left font-medium flex justify-between items-center text-primary"
                  >
                    <span className="font-body pr-4">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-text-muted" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 text-text-secondary font-body text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <NewsletterSignup />
    </main>
  );
}
