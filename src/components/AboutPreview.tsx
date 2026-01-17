import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const skills = [
  'Interactive Design',
  'Creative Development',
  'Data Visualization',
  'Generative Systems',
  'Motion Design',
  'WebGL & 3D',
];

export const AboutPreview = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-card">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
              About
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-6">
              Crafting at the intersection of design & technology
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
              I believe in the power of thoughtful design to create meaningful connections. 
              Each project is an opportunity to explore new territories, push boundaries, 
              and deliver experiences that resonate.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="px-4 py-2 font-body text-xs tracking-wide text-muted-foreground bg-secondary border border-border rounded-full"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <Link 
              to="/about"
              className="inline-block font-display text-sm tracking-wide text-primary hover:text-foreground transition-colors duration-300 link-hover"
            >
              Learn More →
            </Link>
          </motion.div>

          {/* Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Decorative geometric element */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-md">
                {/* Outer ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                />
                
                {/* Inner structure */}
                <g className="animate-rotate-slow origin-center" style={{ transformOrigin: '200px 200px' }}>
                  <polygon
                    points="200,40 340,280 60,280"
                    fill="none"
                    stroke="hsl(var(--geo-line))"
                    strokeWidth="1"
                  />
                  <polygon
                    points="200,360 60,120 340,120"
                    fill="none"
                    stroke="hsl(var(--geo-line))"
                    strokeWidth="1"
                  />
                </g>

                {/* Center accent */}
                <circle
                  cx="200"
                  cy="200"
                  r="30"
                  fill="hsl(var(--primary))"
                  opacity="0.8"
                  className="animate-pulse-subtle"
                />
                
                {/* Orbital dots */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <circle
                    key={i}
                    cx={200 + Math.cos((angle * Math.PI) / 180) * 120}
                    cy={200 + Math.sin((angle * Math.PI) / 180) * 120}
                    r="4"
                    fill="hsl(var(--muted-foreground))"
                    opacity="0.4"
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
