import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GeometricCore from './GeometricCore';
import ParticleField from './ParticleField';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Layer 3: Particle Field (subtle, supporting role) */}
      <ParticleField 
        particleCount={25}
        direction="radial"
        intensity={0.6}
      />

      {/* Layer 1: Core Geometric Structure (protagonist) - positioned behind content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] opacity-60">
          <GeometricCore 
            className="w-full h-full"
            intensity={0.8}
            interactive={false}
          />
        </div>
      </div>

      {/* Content - positioned above geometry */}
      <div className="relative z-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block font-body text-xs tracking-[0.3em] uppercase text-primary mb-6">
              Creative Development
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6"
          >
            <span className="text-foreground">Building</span>
            <br />
            <span className="text-gradient-accent">Digital Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Crafting immersive interfaces where form meets function. 
            Every detail, intentional. Every interaction, meaningful.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/projects"
              className="group relative px-8 py-4 font-display text-sm tracking-wide overflow-hidden rounded-sm"
            >
              <span className="relative z-10 text-primary-foreground group-hover:text-background transition-colors duration-500">
                Explore Projects
              </span>
              <div className="absolute inset-0 bg-primary transition-transform duration-500 ease-out" />
              <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </Link>

            <Link
              to="/contact"
              className="group px-8 py-4 font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 link-hover"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border border-muted-foreground/30 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
