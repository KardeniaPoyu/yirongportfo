import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <polygon
                  points="16,2 30,24 2,24"
                  fill="none"
                  stroke="hsl(38, 80%, 55%)"
                  strokeWidth="1.5"
                  className="transition-all duration-500 group-hover:stroke-[2]"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="4"
                  fill="hsl(38, 80%, 55%)"
                  className="transition-all duration-500 group-hover:r-5"
                />
              </svg>
            </div>
            <span className="font-display text-lg font-medium tracking-tight text-foreground">
              Studio
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative group"
              >
                <span className={`font-body text-sm tracking-wide transition-colors duration-300 ${
                  location.pathname === item.path 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}>
                  {item.label}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
