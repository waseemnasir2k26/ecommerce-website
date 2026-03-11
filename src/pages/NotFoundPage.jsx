import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { setPageSEO } from '../utils/seo';

export default function NotFoundPage() {
  useEffect(() => {
    setPageSEO({
      title: 'Page Not Found',
      description: "The page you're looking for doesn't exist.",
    });
  }, []);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
          className="font-display text-8xl text-accent"
        >
          404
        </motion.h1>
        <h2 className="font-display text-3xl">Page Not Found</h2>
        <p className="text-text-secondary font-body max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-body font-medium hover:opacity-90 transition-opacity mt-2"
        >
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}
