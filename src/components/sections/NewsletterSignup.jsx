import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Mail } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-bg-secondary py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Mail
              size={36}
              className="mx-auto mb-4 text-accent"
              strokeWidth={1.5}
            />

            <h2 className="font-display text-3xl text-primary mb-3">
              Join the Community
            </h2>

            <p className="text-text-secondary font-body mb-8">
              Get 10% off your first order + exclusive access to new arrivals
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={cn(
                      'flex-1 px-4 py-3',
                      'rounded-lg sm:rounded-l-lg sm:rounded-r-none',
                      'border border-border bg-white',
                      'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
                      'font-body text-primary placeholder:text-text-muted',
                      'mb-3 sm:mb-0'
                    )}
                  />
                  <button
                    type="submit"
                    className={cn(
                      'bg-primary text-white px-6 py-3',
                      'rounded-lg sm:rounded-r-lg sm:rounded-l-none',
                      'font-semibold hover:bg-primary-light transition-colors',
                      'whitespace-nowrap'
                    )}
                  >
                    Subscribe
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-center gap-2 text-green-600"
                >
                  <CheckCircle size={22} />
                  <span className="font-semibold">
                    Thanks for subscribing!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-xs text-text-muted mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
