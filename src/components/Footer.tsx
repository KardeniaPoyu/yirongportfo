import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const socialLinks = [
  { label: 'GitHub', url: '#' },
  { label: 'LinkedIn', url: '#' },
  { label: 'Twitter', url: '#' },
];

export const Footer = () => {
  return (
    <footer className="relative border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-8">
                <svg viewBox="0 0 32 32">
                  {/* Academic portfolio icon: stacked documents/portfolio */}
                  <rect
                    x="6"
                    y="8"
                    width="20"
                    height="16"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.5"
                    rx="1"
                  />
                  <rect
                    x="8"
                    y="6"
                    width="20"
                    height="16"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.5"
                    rx="1"
                  />
                  <line
                    x1="10"
                    y1="12"
                    x2="22"
                    y2="12"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                  />
                  <line
                    x1="10"
                    y1="16"
                    x2="18"
                    y2="16"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              <span className="font-display text-lg font-medium text-foreground">
                Portfolio
              </span>
            </Link>
            <p className="font-body text-sm text-muted-foreground max-w-xs">
              A collection of academic and creative works exploring design, technology, and innovation.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-display text-sm font-medium text-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-display text-sm font-medium text-foreground mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © 2024 Portfolio. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Designed & Built with precision
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
