import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { cn } from '../../utils/cn';

const companyLinks = [
  { name: 'About', path: '/about' },
  { name: 'Careers', path: '#' },
  { name: 'Press', path: '#' },
];

const shopLinks = [
  { name: 'All Products', path: '/shop' },
  { name: 'New Arrivals', path: '/shop?filter=new' },
  { name: 'Sale', path: '/shop?filter=sale' },
  { name: 'Collections', path: '/collections' },
  { name: 'Lookbook', path: '/lookbook' },
];

const supportLinks = [
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/contact' },
  { name: 'Shipping & Returns', path: '#' },
  { name: 'Size Guide', path: '#' },
];

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-sm uppercase tracking-wider text-text-muted mb-4 font-mono">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className="text-gray-400 hover:text-white transition text-sm font-body"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div>
            <Link to="/" className="font-display text-2xl font-bold">
              LUXE
            </Link>
            <p className="mt-4 text-gray-400 text-sm font-body leading-relaxed max-w-xs">
              Curated luxury essentials for the modern lifestyle. Timeless design
              meets everyday elegance.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company */}
          <FooterColumn title="Company" links={companyLinks} />

          {/* Shop */}
          <FooterColumn title="Shop" links={shopLinks} />

          {/* Support */}
          <FooterColumn title="Support" links={supportLinks} />
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            'border-t border-white/10 mt-12 pt-8 pb-4',
            'flex flex-col sm:flex-row items-center justify-between gap-4'
          )}
        >
          <p className="text-gray-400 text-sm font-body">
            &copy; 2026 LUXE. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm font-body">
            <Link to="#" className="text-gray-400 hover:text-white transition">
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="#" className="text-gray-400 hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Credits */}
        <div className="border-t border-white/5 pt-4 pb-4 text-center">
          <p className="text-gray-500 text-xs font-body">
            Built by{' '}
            <a
              href="https://www.skynetjoe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors"
            >
              Skynet Labs
            </a>
            {' '}&middot;{' '}
            <a
              href="https://www.waseemnasir.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors"
            >
              Waseem Nasir
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
